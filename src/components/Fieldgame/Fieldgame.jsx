// import { useState } from "react";
import css from './Fieldgame.module.css';

const FieldGame = ({ children }) => {
    return (
        <div className={css.fieldGame}>
            { children }
        </div>
    )
}

export default FieldGame;