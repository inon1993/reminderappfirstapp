import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  fname: "",
  lname: "",
  email: "",
  username: "",
  isLoggedIn: false,
  isLoading: false,
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    if(localStorage.getItem('isLoggedIn') === '1') {
      // console.log('RRRRRRRRRRRRRRRRRRRRRRRRRR');
      setIsLoading(true);
    
    axios
      .get("/api/auth")
      .then((response) => {
        console.log(response.data);
        if (response.data.msg === "User is authenticated.") {
          console.log("user is auth!");
          loginHandler(response.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        } else {
          console.log("user is not auth!");
          setIsLoading(false);
          setIsLoggedIn(false); 
          localStorage.removeItem('isLoggedIn');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        localStorage.removeItem('isLoggedIn');
      });
    } else {
      setIsLoading(false);
      localStorage.removeItem('isLoggedIn');
      }
  }, []);

  const loginHandler = (data) => {
    setUserData(data);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', '1');
  };

  const logoutHandler = () => {
    axios
      .get("/api/logout")
      .then((response) => {
        if (response.data.msg === "Logout is successfull.") {
          setIsLoggedIn(false);
          localStorage.removeItem('isLoggedIn');
        } else {
          console.log("logout is not successfull.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        fname: userData.fname,
        lname: userData.lname,
        email: userData.email,
        username: userData.username,
        isLoggedIn: isLoggedIn,
        isLoading: isLoading,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
