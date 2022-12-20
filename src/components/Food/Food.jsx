import css from './Food.module.css'

const Food = ({ food }) => { 
    return (
        <div className={css.food} style={{ top: `${food.y}%`, left: `${food.x}%` }}></div>
    )
}

export default Food;