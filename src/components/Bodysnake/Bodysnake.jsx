import css from './Bodysnake.module.css';

const BobySnake = ({ bodysnake }) => { 
    return (
        <>
            {
                bodysnake.map((cell, i) => { 
                    return (
                    <div key={i} className={css.bodysnake} style={{ top: `${cell.y}%`, left: `${cell.x}%` }}></div>
                )
            })
        }
        </>
        )
}

export default BobySnake;