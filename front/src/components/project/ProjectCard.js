import pro from "../style/mvpCardBody.module.scss";

function ProjectCard({ project, isEditable, setIsEditing, handleDelete }) {
  const { title = "", description = "", fromDate = "", toDate = "" } = project;

  return (
    <div className={pro.mvpBox}>
      <span className={pro.mvpTitle}>{title}</span>
      <br />
      <span>{description}</span>
      <br />
      <span className={pro.mvpDate}>{fromDate}</span>
      <br />
      <span className={pro.mvpDate}>{toDate}</span>
      <br />
      <div className={pro.mvpBtnBox}>
        {isEditable && (
          <>
            <button
              className={pro.mvpBtn}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              Edit
            </button>
            <button className={pro.mvpBtn} onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
