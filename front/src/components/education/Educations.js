import React, { useState, useEffect } from "react";
import { EducationContext } from "./EducationContext";

import * as Api from "../../api";
import Education from "./Education";
import EducationForm from "./EducationForm";
import education from "../style/mvpCardBody.module.scss";

const Educations = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEducations(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <EducationContext.Provider value={{ educations, setEducations }}>
      <div className={education.mvpContainer}>
        <div className={education.mvpContaineritle}>Education</div>
        {educations.map((education) => (
          <Education
            key={education.id}
            education={education}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <div>
            <button
              className={education.mvpBtn}
              onClick={() => setIsAdding(true)}
            >
              +
            </button>
          </div>
        )}
        {isAdding && (
          <EducationForm
            portfolioOwnerId={portfolioOwnerId}
            setIsAdding={setIsAdding}
          />
        )}
      </div>
    </EducationContext.Provider>
  );
};

export default Educations;
