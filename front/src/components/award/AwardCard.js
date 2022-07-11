import aw from "../style/mvpCardBody.module.scss";

const AwardCard = ({ award, isEditable, setIsEditing, handleDelete }) => {
  const { title = "", description = "" } = award;

  return (
    <div className={aw.mvpBox}>
      <span className={aw.mvpTitle}>{title}</span>
      <br />
      <span>{description}</span>
      <div className={aw.mvpBtnBox}>
        {isEditable && (
          <>
            <button
              className={aw.mvpBtn}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              Edit
            </button>
            <button className={aw.mvpBtn} onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AwardCard;
