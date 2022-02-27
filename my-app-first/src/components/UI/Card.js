import classes from "./Card.module.css";

const Card = (props) => {
  const background = props.background;
  return (
    <div
      className={`${classes.card} ${props.className}`}
      style={{ backgroundColor: { background } }}
    >
      {props.children}
    </div>
  );
};

export default Card;
