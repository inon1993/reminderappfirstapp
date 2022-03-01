import { useState, useRef } from "react";
import Modal from "../UI/Modal";
import axios from "axios";
import classes from "./ReminderModal.module.css";

const ReminderModal = (props) => {

  const [isEdit, setIsEdit] = useState(false);

  const titleRef = useRef();
  const bodyRef = useRef();

  const editReminderHandler = () => {
    setIsEdit(true);
  }

  const saveEditHandler =() => {
    console.log(props.id);
    const payload = {
      title: titleRef.current.value,
      body: bodyRef.current.value,
      id: props.id
    }

    axios({
      method: 'patch',
      url: '/api/edit',
      data: payload
  })
  .then(() => {
    console.log("Data has been updated.");
    props.onClose();
    props.onRefresh();
  })
  .catch(() => {
    console.log("update error.");
  });;
}

  const closeReminderHandler = () => {
    props.onClose();
  };

  const cancelEditHandler = () => {
    setIsEdit(false);
  }

  return (
    <Modal onClose={closeReminderHandler}>
      <div className={classes['modal-reminder-wrapper']}>
        {!isEdit && <h1 className={classes.title}>{props.title}</h1>}
        {isEdit && <input className={classes['title-edit']} defaultValue={props.title} ref={titleRef} />}
        {!isEdit && <p className={classes.body}>{props.body}</p>}
        {isEdit && <textarea className={classes['body-edit']} defaultValue={props.body} ref={bodyRef} />}
      </div>  
      <div className={classes.actions}>
        {!isEdit && <button className={classes.edit} onClick={editReminderHandler}>Edit</button>}
        {isEdit && <button className={classes.save} onClick={saveEditHandler}>Save</button>}
        {!isEdit && <button className={classes.close} onClick={closeReminderHandler}>Close</button>}
        {isEdit && <button className={classes.cancel} onClick={cancelEditHandler}>Cancel</button>}
      </div>
    </Modal>
  );
};

export default ReminderModal;
