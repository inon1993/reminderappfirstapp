import react, { useRef, useEffect, useState } from "react";
import Card from "../UI/Card";

import classes from "./AddReminderForm.module.css";

const AddReminderForm = (props) => {
  const [date, setDate] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [time, setTime] = useState("");
  const [enteredTime, setEnteredTime] = useState("");
  const [isColor, setIsColor] = useState("white");
  const [fix, setFix] = useState("00:00");
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const current = new Date();
    let day = "";
    let month = "";
    let hours = "";
    let minutes = "";

    if (current.getDate() < 10) {
      day = `0${current.getDate()}`;
    } else {
      day = current.getDate();
    }
    if (current.getMonth() + 1 < 10) {
      month = `0${current.getMonth() + 1}`;
    } else {
      month = current.getMonth + 1;
    }

    if (current.getHours() < 10) {
      hours = `0${current.getHours()}`;
    } else {
      hours = current.getHours();
    }
    if (current.getMinutes() < 10) {
      minutes = `0${current.getMinutes()}`;
    } else {
      minutes = current.getMinutes();
    }

    setTime(hours + ":" + minutes);

    setEnteredTime(hours + ":" + minutes);

    setDate(`${current.getFullYear()}-${month}-${day}`);

    setEnteredDate(`${current.getFullYear()}-${month}-${day}`);
  }, [date, time]);

  const closeFormHandler = () => {
    props.onCloseForm();
  };

  const titleRef = useRef();
  const bodyRef = useRef();

  const addReminderHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const body = bodyRef.current.value;

    if (title === "" || body === "") {
      setIsEmpty(true);
      setTimeout(() => {
        setIsEmpty(false);
      }, 2000);
      return;
    } else {
      setIsEmpty(false);
    }

    let reminderDate = "";
    if (enteredDate.trim().length === 0) {
      reminderDate = date;
    } else {
      reminderDate = enteredDate;
    }

    let reminderTime = "";
    if (enteredTime.trim().length === 0) {
      reminderTime = time;
    } else {
      reminderTime = enteredTime;
    }

    props.onAddReminder(title, body, reminderDate, reminderTime, isColor);

    setIsColor("white");

    titleRef.current.value = "";
    bodyRef.current.value = "";
  };

  const changeDateHandler = (event) => {
    setEnteredDate(event.target.value);

    if (event.target.value !== date) {
      setFix("00:00");
    } else {
      setFix(time);
    }
  };

  const changeTimeHandler = (event) => {
    if (enteredDate === "" || enteredDate === date) {
      setFix(time);
    }
    setEnteredTime(event.target.value);
  };

  const colorChange = (event) => {
    setIsColor(event.target.value);
  };

  return (
    <Card className={classes["card-form"]}>
      <form
        className={classes["add-reminder-form"]}
        onSubmit={addReminderHandler}
      >
        <label className={classes.title}>Title:</label>
        <input className={classes["title-input"]} ref={titleRef} />
        <label className={classes.body}>Reminder Body:</label>
        <textarea
          className={classes["body-input"]}
          rows="10"
          cols="50"
          ref={bodyRef}
        />
        {isEmpty && (
          <p className={classes.empty}>
            Title or Body are missing. Reminder will not be saved.
          </p>
        )}
        <label className={classes.date}>Pick a Date and Time:</label>
        <div className={classes["date-time-inputs"]}>
          <input
            className={classes["date-input"]}
            type="date"
            defaultValue={date}
            min={date}
            onChange={changeDateHandler}
          />
          <input
            className={classes["time-input"]}
            type="time"
            id="appt"
            name="appt"
            defaultValue={time}
            min={fix}
            required
            onChange={changeTimeHandler}
          />
        </div>
        <div className={classes["reminder-color"]}>
          <label className={classes.color}>Pick a color:</label>
          <ul className={classes["color-ul"]}>
            <button
              className={`${classes.white} ${classes.colorpick}`}
              type="button"
              value="white"
              onClick={colorChange}
            ></button>
            <button
              className={`${classes.lightblue} ${classes.colorpick}`}
              type="button"
              value="lightblue"
              onClick={colorChange}
            ></button>
            <button
              className={`${classes.lightyellow} ${classes.colorpick}`}
              type="button"
              value="lightyellow"
              onClick={colorChange}
            ></button>
            <button
              className={`${classes.lightpink} ${classes.colorpick}`}
              type="button"
              value="lightpink"
              onClick={colorChange}
            ></button>
            <button
              className={`${classes.lightgreen} ${classes.colorpick}`}
              type="button"
              value="lightgreen"
              onClick={colorChange}
            ></button>
          </ul>
        </div>
        <div className={classes.buttons}>
          <button className={classes["add-button"]}>Add Reminder</button>
          <button
            className={classes["close-button"]}
            onClick={closeFormHandler}
          >
            Close
          </button>
        </div>
      </form>
    </Card>
  );
};

export default AddReminderForm;
