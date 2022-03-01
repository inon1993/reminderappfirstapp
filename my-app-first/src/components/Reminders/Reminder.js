import { useState } from "react";

import Card from "../UI/Card";
import DeleteBtn from "./DeleteBtn";
import ReminderModal from "./ReminderModal";

import classes from "./Reminder.module.css";

const Reminder = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const deleteHandler = () => {
    const reminderToDelete = props.id;
    console.log(reminderToDelete);
    props.onDeleteReminder(reminderToDelete);
  };

  const openReminderHandler = () => {
    setIsClicked(true);
  };

  const closeReminderHandler = () => {
    setIsClicked(false);
  };

  return (
    <div>
      {isClicked && (
        <ReminderModal
          title={props.title}
          body={props.body}
          id={props.id}
          onClose={closeReminderHandler}
          onRefresh={props.onEditReminderRefresh}
        />
      )}
      <Card className={classes["reminder-card"]} background={props.color}>
        <div
          className={classes["color-div"]}
          style={{ backgroundColor: props.color }}
        >
          <div className={classes.reminder} onClick={openReminderHandler}>
            <h1 className={classes["reminder-title"]}>{props.title}</h1>
            <p className={classes["reminder-body"]}>{props.body}</p>
            <p className={classes["reminder-date"]}>{props.date}</p>
          </div>

          <div className={classes["del-area"]}>
            <DeleteBtn onDelete={deleteHandler} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reminder;
