import { useContext, useState } from "react";
import Card from "../UI/Card";
import SignUpForm from "./SignUpForm";
import axios from "axios";
import classes from "./SignUp.module.css";
import AuthContext from "../../store/auth-context";

const SignUp = (props) => {
  const ctx = useContext(AuthContext);

  const [isUsernameExist, setIsUsernameExist] = useState(false);

  const addNewUserHandler = (fname, lname, email, username, password) => {
    const payload = {
      fname: fname,
      lname: lname,
      email: email,
      username: username,
      password: password,
    };

    axios({
      url: "/api/signup",
      method: "POST",
      data: payload,
    })
      .then((response) => {
        if (response.data.msg === "Username already exists") {
          setIsUsernameExist(true);
        } else {
          setIsUsernameExist(false);
          console.log("Data has been sent to the server.");
          ctx.onLogin(response.data);
          props.onClose();
        }
      })
      .catch(() => {
        console.log("Internal server error.");
      });
  };

  const closeSignUpHandler = () => {
    props.onClose();
  };

  return (
    <div>
      <Card className={classes["sign-up-card"]}>
        <h1 className={classes["sign-up-hello"]}>Lets Sign You Up!</h1>
        <SignUpForm
          onLoginForm={props.onLogin}
          onClose={closeSignUpHandler}
          onSignUp={addNewUserHandler}
          unExist={isUsernameExist}
        />
      </Card>
    </div>
  );
};

export default SignUp;
