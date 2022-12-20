import css from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useRef } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from '../Container';
import FieldGame from '../Fieldgame';
import Recordlist from '../Recordlist';
import Form from '../Form';
import Player from '../Player';
import BobySnake from '../Bodysnake';
import Food from '../Food';
import MyModal from '../Modal';
import { getRecordPlayers, createPlayer } from '../../servises/api-servises';
import { getFood } from '../utils/getFood';

const initialSnake = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 8, y: 0 }];
const initialFood = { x: 16, y: 16 };
const initialDirection = "ArrowRight";
const initialSpeed = 150;
const initialCounter = 1;

function App() {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);
  const [snake, setSnake] = useState(initialSnake);
  const [randomFood, setRandomFood] = useState(initialFood);
  const [isStart, setIsStart] = useState(false);
  const [direction, setDirection] = useState(initialDirection);
  const [speed, setSpeed] = useState(initialSpeed);
  const [counter, setCounter] = useState(initialCounter);
  const [showModal, setShowModal] = useState(false);
  const [recordPlayers, setRecordPlayers] = useState([]);

  const idInterval = useRef(null);

  function onSubmit (dataSubmit) {
    const { name } = dataSubmit;
    setName(name);
  };

  function toggleStart() { 
    setIsStart(!isStart);
  };

  function handleKeyDown(evt) { 
    evt = evt || window.event;
    switch (evt.keyCode) {
      case 38:
        setDirection("ArrowUp");
        break;
      case 40:
        setDirection("ArrowDown");
        break;
      case 37:
        setDirection( "ArrowLeft");
        break;
      case 39:
        setDirection("ArrowRight");
        break;
      default:
        break;
    }
  };

  function snakeMove() {
    if (!isStart) return;
    const bodySnake = [...snake];
    const headSnake = bodySnake[bodySnake.length - 1];
    const newHeadSnake = {x: headSnake.x, y: headSnake.y}
    
    switch (direction) {
      case "ArrowUp":
        newHeadSnake.y -= 4;
        break;
      case "ArrowRight":
        newHeadSnake.x += 4;
        break;
      case "ArrowDown":
        newHeadSnake.y += 4;
        break;
      case "ArrowLeft":
        newHeadSnake.x -= 4;
        break;

      default:
        return;
    };

    bodySnake.push(newHeadSnake);

    if (randomFood.x === newHeadSnake.x && randomFood.y === newHeadSnake.y) {
      const newFood = getFood();
      setRandomFood(newFood);
      counterPoints();
      speedIncrease();
      setSnake(bodySnake);
    } else {
      bodySnake.shift();
      setSnake(bodySnake);
    }
  };

  function SnakeOutBorder() {
    const bodySnake = [...snake];
    const currentHead = bodySnake[bodySnake.length - 1];
    if (currentHead.x >= 100) {
      currentHead.x = currentHead.x -100;
    }

    if (currentHead.x < 0) {
      currentHead.x = currentHead.x +100;
    }

    if (currentHead.y >= 100) {
      currentHead.y = currentHead.y -100;
    }

    if (currentHead.y < 0) {
      currentHead.y = currentHead.y +100;
    }
  };

  function crossesBody () {
    const bodySnake = [...snake];
    const headSnake = bodySnake[bodySnake.length - 1];
    bodySnake.pop();

    const result = bodySnake.find(cell => (cell.x === headSnake.x && cell.y === headSnake.y));
    if (result) {
      toggleStart();
      setShowModal(true);
      gameOver();
    }
  };

  function counterPoints () {
    let newCounter = counter;
    let newPoints = points;

    switch (newCounter) { 
      case 1:
        newPoints += 1;
        break;
      case 2:
        newPoints += 5;
        break;
      case 3:
        newPoints += 10;
        break;
      default:
        break;
    }

    if (newCounter < 3) {
      newCounter += 1;
    } 
  
    setPoints(newPoints);
    setCounter(newCounter);
  };

  function speedIncrease() {
    if (points > 50 && (speed > 30) && ((points - 6)% 50 === 0)) { 
      const newSpeed = speed - 30;
      setSpeed(newSpeed);
    }
  };

  function gameOver() {
    createPlayer({ name, points });
    setSnake(initialSnake);
    setRandomFood(initialFood);
    setDirection(initialDirection);
    setCounter(initialCounter);
  }

  function onClickButtonYes() { 
    setPoints(0);
    getRecordList();
  }
  
  function onClickButtonNo () { 
    setPoints(0);
    setSpeed(200);
    setName("");
    window.location.reload()
  }

  function toggleModal () { 
    setShowModal(!showModal);
  }

  async function getRecordList() { 
    try {
      const { data } = await getRecordPlayers();
      setRecordPlayers(data.result);
    } catch (error) { 
      console.log(error.massage);
    }
  }

  useEffect(() => {
    window.onkeydown = handleKeyDown;
    SnakeOutBorder();
    crossesBody();

    idInterval.current = setInterval(() => {
      snakeMove();
    }, speed);
    return () => clearInterval(idInterval.current);
  },);

  useEffect(() => {
    getRecordList();
  },[]);

  return (
    <>
      <Container>
        <div>
          <Form onSubmit={onSubmit}/>
          <div className={css.userPointsDiv}>
          <Player name={name} points={points} />
          <button className={css.button}
              type="submit"
              disabled={!name}
              onClick={() => toggleStart()}>{isStart ? "Pause" : "Start"}
          </button>
          </div>
        </div>
        <MyModal showModal={showModal}
               closeModal={toggleModal}
               onClickYes={onClickButtonYes}
               onClickNo={onClickButtonNo}
               txt={points} />
        <FieldGame>
          <BobySnake bodysnake={snake}/>
          <Food food={randomFood}/>
        </FieldGame>
        <Recordlist recordList={recordPlayers} />
        <ToastContainer/>
      </Container>
    </>
  );
}

export default App;
