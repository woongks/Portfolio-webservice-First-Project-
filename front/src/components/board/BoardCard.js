// import { Card, Button, Row, Col } from "react-bootstrap";
import styles from "../style/box.module.scss";

function BoardCard({ board, isEditable, setIsEditing, handleDelete }) {
  const { title = "", context = "" } = board;

  return (
    <div className={styles.bCard}>
      <span className={styles.bCardTitle}> {title}</span>
      <span className={styles.bCardContext}>{context}</span>
      {isEditable ? (
        <div className={styles.bCardBtns}>
          <button
            className={styles.bCardBtn}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            Edit
          </button>
          <button className={styles.bCardBtn} onClick={handleDelete}>
            Delete
          </button>
        </div>
      ) : (
        <div className={styles.bCardBtns}></div>
      )}
    </div>
  );
}

export default BoardCard;
