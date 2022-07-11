import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import car from "../style/mvpCardBody.module.scss";

function CareerCard({
  career,
  isEditable,
  setIsEditing,
  setCareers,
  handleDelete,
}) {
  const { company = "", fromDate = "", toDate = " " } = career;

  return (
    <div className={car.mvpBox}>
      <span className={car.mvpTitle}>{career.company}</span>
      <br />
      <span className={car.mvpDate}>{career.fromDate}</span>
      <br />
      <span className={car.mvpDate}>{career.toDate}</span>
      <div className={car.mvpBtnBox}>
        {isEditable && (
          <>
            <button
              className={car.mvpBtn}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              Edit
            </button>
            <button className={car.mvpBtn} onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CareerCard;
