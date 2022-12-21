import css from "./Button.module.css";

const Button = ({ type, text }) => {
  return (
    <button className={css.button} type={type}>
      {text}
    </button>
  );
};

export default Button;
