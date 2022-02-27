import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import classes from "./DeleteBtn.module.css";

const DeleteBtn = (props) => {
  const deleteReminderHandler = () => {
    props.onDelete();
  };

  return (
    <button
      className={classes.delete}
      type="button"
      onClick={deleteReminderHandler}
    >
      <p className={classes.icon}><FontAwesomeIcon icon={faTrashAlt} /></p>
    </button>
  );
};

export default DeleteBtn;
