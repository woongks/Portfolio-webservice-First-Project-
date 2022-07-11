import React, { useState, useContext } from "react";
import EducationCard from "./EducationCard";
import EducationForm from "./EducationForm";
import * as Api from "../../api";
import { EducationContext } from "./EducationContext";

const Education = ({ education, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { educations, setEducations } = useContext(EducationContext);
  async function handleDelete(e) {
    if (window.confirm("Are you sure?")) {
      e.preventDefault();
      e.stopPropagation();
      try {
        await Api.delete("educations", education.id);
        const idx = educations.findIndex((item) => item.id === education.id);
        educations.splice(idx, 1);
        setEducations([...educations]);
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <>
      {isEditing ? (
        <EducationForm
          setIsEditing={setIsEditing}
          currentEducation={education}
        />
      ) : (
        <EducationCard
          education={education}
          portfolioOwnerId={education.userId}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Education;
