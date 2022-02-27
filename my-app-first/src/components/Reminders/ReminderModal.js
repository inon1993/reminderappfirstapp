import Modal from "../UI/Modal";
import classes from "./ReminderModal.module.css";

const ReminderModal = (props) => {
  const closeReminderHandler = () => {
    props.onClose();
  };

  return (
    <Modal onClose={closeReminderHandler}>
      <h1 className={classes.title}>{props.title}</h1>
      <p className={classes.body}>{props.body}</p>
      <div className={classes.actions}>
        <button onClick={closeReminderHandler}>Close</button>
      </div>
    </Modal>
  );
};

export default ReminderModal;
