import React, { useState, useContext } from "react";
import CareerCard from "./CareerCard";
import CareerForm from "./CareerForm";
import * as Api from "../../api";
import { CareerContext } from "./CareerContext";

const Career = ({ career, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { careers, setCareers } = useContext(CareerContext);
  async function handleDelete(e) {
    if (window.confirm("Are you sure?")) {
      e.preventDefault();
      e.stopPropagation();
      try {
        await Api.delete("careers", career.id);
        const idx = careers.findIndex((item) => item.id === career.id);
        careers.splice(idx, 1);
        setCareers([...careers]);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <>
      {isEditing ? (
        <CareerForm setIsEditing={setIsEditing} currentCareer={career} />
      ) : (
        <CareerCard
          career={career}
          portfolioOwnerId={career.userId}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Career;
