import { useRef, useState } from "react";
import classes from "./LoginForm.module.css";
import axios from "axios";

const LoginForm = (props) => {
  const [isInputValid, setIsInputValid] = useState(true);

  const unRef = useRef();
  const passRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const username = unRef.current.value;
    const password = passRef.current.value;
    if (username.trim().length < 1 || password.trim().length < 1) {
      setIsInputValid(false);
      return;
    } else {
      setIsInputValid(true);
    }
    props.onLoginForm(username, password);
  };

  return (
    <form className={classes["login-form"]} onSubmit={formSubmitHandler}>
      <label className={classes.username}>Username:</label>
      <input className={classes["un-input"]} type="text" ref={unRef} />
      <label className={classes.password}>Password:</label>
      <input className={classes["pw-input"]} type="password" ref={passRef} />
      <button className={classes["login-button"]} type="submit">
        Click to Login!
      </button>
      {!isInputValid && (
        <p className={classes["invalid-login-msg"]}>
          Please enter valid Username and Password.
        </p>
      )}
      {!props.onInvalidLogin && isInputValid && (
        <p className={classes["invalid-login-msg"]}>
          Username and Password doesn't match.
        </p>
      )}
    </form>
  );
};

export default LoginForm;
