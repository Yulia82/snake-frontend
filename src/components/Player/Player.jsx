import css from "./Player.module.css";

const Player = ({ name, points }) => {
  return (
    <div>
      <div className={css.player}> Name Player: {name}</div>
      <div className={css.player}> Points: {points} </div>
    </div>
  );
};

export default Player;
