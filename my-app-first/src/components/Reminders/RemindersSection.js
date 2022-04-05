import react, { useState, useEffect, useContext } from "react";
import axios from "axios";

import AddReminderForm from "./AddReminderForm";
import Reminder from "./Reminder";
import AuthContext from "../../store/auth-context";

import classes from "./ReminderSection.module.css";

// const client = require('@sendgrid/client');

const ReminderSection = (props) => {
  const ctx = useContext(AuthContext);
  const [isClicked, setIsClicked] = useState(false);
  const [reminderList, setReminderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getReminders();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const getReminders = () => {
    // setIsLoading(true);
    axios
      .get("/api/data", { params: { username: ctx.username } })
      .then((response) => {
        setReminderList(response.data.reverse());
        console.log("Data has been received.");
        // setIsLoading(false);
      })
      .catch(() => {
        console.log("Error retrieving data!");
      });
  };

  const openFormHandler = () => {
    setIsClicked(true);
  };

  const closeFormHandler = () => {
    setIsClicked(false);
  };

  const addReminderToListHandler = (title, body, date, time, color) => {
    setSearchText("");

    const payload = {
      title: title,
      body: body,
      date: date,
      time: time,
      color: color,
      username: ctx.username,
    };

    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server.");
        getReminders();
      })
      .catch(() => {
        console.log("Internal server error.");
      });
  };

  const deleteReminderFromList = (id) => {
    const reminderId = {
      id: id,
    };
    console.log(reminderId);
    axios({
      url: "/api/delete",
      method: "DELETE",
      data: reminderId,
    })
      .then(() => {
        console.log("Data has been deleted successfully.");
        getReminders();
      })
      .catch(() => {
        console.log("Delete error.");
      });
  };

  const searchHandler = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <react.Fragment>
      {!isClicked && (
        <button
          className={classes["open-form-button"]}
          onClick={openFormHandler}
        >
          +
        </button>
      )}
      {isClicked && (
        <AddReminderForm
          onCloseForm={closeFormHandler}
          onAddReminder={addReminderToListHandler}
        />
      )}
      <div className={classes["list-section"]}>
        <div className={classes["search-wrapper"]}>
          <input
            className={classes.search}
            type="text"
            placeholder="Search"
            onChange={searchHandler}
          />
        </div>
        {/* <div className={classes['reminders-wrapper']}> */}

        {isLoading && (
          <div className={classes["lds-ellipsis"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {!isLoading && (
          <ul className={classes.ul}>
            {reminderList
              .filter((val) => {
                if (searchText === "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(searchText.toLowerCase()) ||
                  val.title.toLowerCase().includes(searchText.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((reminder) => {
                return (
                  <Reminder
                    key={reminder._id}
                    id={reminder._id}
                    title={reminder.title}
                    body={reminder.body}
                    date={reminder.date}
                    time={reminder.time}
                    color={reminder.color}
                    onDeleteReminder={deleteReminderFromList}
                    onEditReminderRefresh={getReminders}
                  />
                );
              })}
          </ul>
        )}
      </div>
      {/* </div> */}
    </react.Fragment>
  );
};

export default ReminderSection;
