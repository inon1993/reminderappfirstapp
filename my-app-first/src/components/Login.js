import Card from "./UI/Card";
import LoginForm from "./LoginForm";
import classes from "./Login.module.css";
import axios from "axios";
import AuthContext from "../store/auth-context";
import { useContext, useState } from "react";

const Login = (props) => {
  const ctx = useContext(AuthContext);

  const [isVaildLogin, setIsValidLogin] = useState(true);

  const onLoginCheck = (username, password) => {
    const payload = {
      username: username,
      password: password,
    };
    console.log(payload);

    axios({
      url: "/api/login",
      method: "POST",
      data: payload,
    })
      .then((response) => {
        const userData = {
          fname: response.data.fname,
          lname: response.data.lname,
          email: response.data.email,
          username: response.data.username,
        };
        if (response.data.msg === "Login was successfull") {
          // setIsUsernameExist(true);
          ctx.onLogin(userData);
        } else {
          // setIsUsernameExist(false);
          console.log("Data has been sent to the server.");
        }
      })
      .catch(() => {
        console.log("Internal server error.");
        setIsValidLogin(false);
      });
  };

  const signUpHandler = () => {
    props.onSignUp();
  };

  return (
    <div>
      <Card className={classes["login-card"]}>
        <h1 className={classes.logo}>
          Reminder<span className={classes.span}>App</span>
        </h1>
        <h1 className={classes["login-hello"]}>Hello Friend!</h1>
        <LoginForm onLoginForm={onLoginCheck} onInvalidLogin={isVaildLogin} />
        {/* <LoginForm onLoginForm={props.onLogin} /> */}
        <div className={classes["sign-up-div"]}>
          <button className={classes["sign-up"]} onClick={signUpHandler}>
            Sign Up
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
