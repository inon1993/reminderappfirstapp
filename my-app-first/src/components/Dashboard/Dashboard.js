import react, { useContext, useEffect, useState } from "react";
import ReminderSection from "../Reminders/RemindersSection";
import AuthContext from "../../store/auth-context";

import classes from "./Dashboard.module.css";
import LogoutBtn from "./LogoutBtn";

const Dashboard = (props) => {
  const ctx = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState("");
  const [titleColor, setTitleColor] = useState("");

  useEffect(() => {
    const time = new Date().getHours();
    if (time > 17 || time < 6) {
      // setImgUrl("/img/app-b2.jpg");
      setImgUrl('#06241d');
      setTitleColor("white");
    } else {
      // setImgUrl("/img/app-b1.jpg");
      setImgUrl('#edf3f3')
      setTitleColor("black");
    }
  });

  const user = ctx.fname;

  return (
    <div
      className={classes.dashboard}
      // style={{ backgroundImage: `url(${imgUrl})` }}
      style={{ backgroundColor: `${imgUrl}` }}
    >
      <nav className={classes.nav}>
        <h1 className={classes.logo}>
          Reminder<span className={classes.span}>App</span>
        </h1>
        <LogoutBtn>Logout</LogoutBtn>
      </nav>
      <nav className={classes.nav2}>
        <h1 className={classes.logo}>
          Reminder<span className={classes.span}>App</span>
        </h1>
        <LogoutBtn />
      </nav>
      <h1 className={classes["hello-user"]} style={{ color: titleColor }}>
        Hello, <span className={classes.name}>{user}</span>
      </h1>
      <ReminderSection />
    </div>
  );
};

export default Dashboard;
