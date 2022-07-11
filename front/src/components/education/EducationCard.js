import React from "react";

import * as Api from "../../api";

import edu from "../style/mvpCardBody.module.scss";

const EducationCard = ({
  education,
  isEditable,
  setIsEditing,
  handleDelete,
}) => {
  const { school = "", major = "", position = "" } = education;

  return (
    <div className={edu.mvpBox}>
      <span className={edu.mvpTitle}>{school}</span>
      <br />
      <span>{`${major} (${position})`}</span>
      <div className={edu.mvpBtnBox}>
        {isEditable && (
          <>
            <button
              className={edu.mvpBtn}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              Edit
            </button>
            <button className={edu.mvpBtn} onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EducationCard;
