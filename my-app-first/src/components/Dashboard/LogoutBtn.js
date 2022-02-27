import { useContext } from "react";
import AuthContext from "../../store/auth-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

import classes from "./LogoutBtn.module.css";

const LogoutBtn = (props) => {

    const ctx = useContext(AuthContext);

  return (
    <button
      className={classes.logout}
      type="button"
      onClick={ctx.onLogout}
    >
      <p className={classes.icon}><FontAwesomeIcon /*size="2x"*/ icon={faDoorOpen} /></p>
      <p className={classes.text}>Logout</p>
    </button>
  );
};

export default LogoutBtn;