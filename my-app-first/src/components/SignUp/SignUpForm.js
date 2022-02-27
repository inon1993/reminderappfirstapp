import { useRef, useState, useReducer, useEffect } from "react";

import classes from "./SignUpForm.module.css";

const fnameReducer = (state, action) => {
  if (action.type === "FNAME") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "FNAME_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: null };
};

const lnameReducer = (state, action) => {
  if (action.type === "LNAME") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "LNAME_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: null };
};

const emailReducer = (state, action) => {
  if (action.type === "EMAIL") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 5 && action.val.includes("@"),
    };
  }
  if (action.type === "EMAIL_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 5 && state.value.includes("@"),
    };
  }
  return { value: "", isValid: null };
};

const usernameReducer = (state, action) => {
  if (action.type === "USERNAME") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "USERNAME_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: null };
};

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: null };
};

const SignUpForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [fnameState, dispachFname] = useReducer(fnameReducer, {
    value: "",
    isValid: null,
  });
  const [lnameState, dispachLname] = useReducer(lnameReducer, {
    value: "",
    isValid: null,
  });
  const [emailState, dispachEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [usernameState, dispachUsername] = useReducer(usernameReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispachPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: fnameIsValid } = fnameState;
  const { isValid: lnameIsValid } = lnameState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: usernameIsValid } = usernameState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(
        fnameIsValid &&
          lnameIsValid &&
          emailIsValid &&
          usernameIsValid &&
          passwordIsValid
      );
    }, 500);

    return () => {
      console.log("CleanUp!");
      clearTimeout(identifier);
    };
  }, [
    fnameIsValid,
    lnameIsValid,
    emailIsValid,
    usernameIsValid,
    passwordIsValid,
  ]);

  const fnameChangeHandler = (event) => {
    dispachFname({ type: "FNAME", val: event.target.value });
  };

  const validateFnameHandler = () => {
    dispachFname({ type: "FNAME_BLUR" });
  };

  const lnameChangeHandler = (event) => {
    dispachLname({ type: "LNAME", val: event.target.value });
  };

  const validateLnameHandler = () => {
    dispachLname({ type: "LNAME_BLUR" });
  };

  const emailChangeHandler = (event) => {
    dispachEmail({ type: "EMAIL", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispachEmail({ type: "EMAIL_BLUR" });
  };

  const usernameChangeHandler = (event) => {
    dispachUsername({ type: "USERNAME", val: event.target.value });
  };

  const validateUsernameHandler = () => {
    dispachUsername({ type: "USERNAME_BLUR" });
  };

  const passwordChangeHandler = (event) => {
    dispachPassword({ type: "PASSWORD", val: event.target.value });
  };

  const validatePasswordHandler = () => {
    dispachPassword({ type: "PASSWORD_BLUR" });
  };

  const newUserHandler = (event) => {
    event.preventDefault();

    validateFnameHandler();
    validateLnameHandler();
    validateEmailHandler();
    validateUsernameHandler();
    validatePasswordHandler();

    if (formIsValid) {
      props.onSignUp(
        fnameState.value,
        lnameState.value,
        emailState.value,
        usernameState.value,
        passwordState.value
      );
    }
  };

  const closeSignUpHandler = () => {
    props.onClose();
  };

  return (
    <form className={classes["sign-up-form"]} onSubmit={newUserHandler}>
      <label className={classes.fname}>First Name:</label>
      <input
        className={`${classes["fname-input"]} ${
          fnameState.isValid === false && classes["invalid-input"]
        }`}
        type="text"
        id="fname"
        autoComplete="off"
        value={fnameState.value}
        onChange={fnameChangeHandler}
        onBlur={validateFnameHandler}
      />
      <label className={classes.lname}>Last Name:</label>
      <input
        className={`${classes["lname-input"]} ${
          lnameState.isValid === false && classes["invalid-input"]
        }`}
        type="text"
        id="lname"
        autoComplete="off"
        value={lnameState.value}
        onChange={lnameChangeHandler}
        onBlur={validateLnameHandler}
      />
      <label className={classes.email}>E-Mail:</label>
      <input
        className={`${classes["email-input"]} ${
          emailState.isValid === false && classes["invalid-input"]
        }`}
        type="email"
        id="email"
        autoComplete="off"
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
      />
      <label className={classes.username}>User Name:</label>
      <input
        className={`${classes["un-input"]} ${
          usernameState.isValid === false && classes["invalid-input"]
        }`}
        type="text"
        id="username"
        autoComplete="off"
        value={usernameState.value}
        onChange={usernameChangeHandler}
        onBlur={validateUsernameHandler}
      />
      {props.unExist === true && (
        <p className={classes["invalid-signup-msg"]}>
          This Username is already taken...
        </p>
      )}
      <label className={classes.password}>Password:</label>
      <input
        className={`${classes["pw-input"]} ${
          passwordState.isValid === false && classes["invalid-input"]
        }`}
        type="text"
        id="password"
        autoComplete="off"
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
      />
      <div className={classes.buttons}>
        <button className={classes["sign-up-button"]} type="submit">
          Sign Up!
        </button>
        <button
          className={classes["close-button"]}
          onClick={closeSignUpHandler}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
