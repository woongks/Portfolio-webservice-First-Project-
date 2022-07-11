import { Card, Button, Row, Col } from "react-bootstrap";
import certi from "../style/mvpCardBody.module.scss";

function CertificateCard({
  certificate,
  isEditable,
  setIsEditing,
  handleDelete,
}) {
  const { title = "", description = "", whenDate = " " } = certificate;

  return (
    <div className={certi.mvpBox}>
      <span className={certi.mvpTitle}>{title}</span>
      <br />
      <span>{description}</span>
      <br />
      <span className={certi.mvpDate}>{whenDate}</span>
      <div className={certi.mvpBtnBox}>
        {isEditable && (
          <>
            <button
              className={certi.mvpBtn}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              Edit
            </button>
            <button className={certi.mvpBtn} onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CertificateCard;
