import { useState } from "react";
import css from './Form.module.css';
import Button from '../Button';
import { toast } from 'react-toastify';

const showToastMessage = () => {
       toast('A name must begin with a letter may contain letters, an apostophe and a space', {
    position: toast.POSITION.TOP_LEFT,
    className: 'toast-message',
    autoClose: 2000,
});
    };

const Form = ({ onSubmit }) => {
    const [name, setName] = useState("");

    function inputChange(evt) { 
        setName(evt.target.value);
    }

    const formSubmit = (evt) => {
        evt.preventDefault();


    if (validation(name) && name) {
        onSubmit({ name });
        setName("");
    } else {
        showToastMessage();
    }
}

    function validation(nameInput) {
        const nameValid = nameInput.match(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)?$/i)
        if (nameValid) {
        return true
        } else { return false}
    }

    return (
        <div className={css.formContainer}>
        <form className={css.form} onSubmit={formSubmit}>
            <label className={css.formLabel}> 
                Enter your name, please 
                <input className={css.forminput} 
                    type="text"
                    value={name}
                    name="name"
                    // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    // title="A name must begin with a letter may contain letters, an apostophe and a space"
                // required
                    onChange={inputChange}
                    // id="playerName"
                />
            </label>
            <Button type="submit" text="Submit"></Button>
            </form>
        </div>
    )
}

export default Form;