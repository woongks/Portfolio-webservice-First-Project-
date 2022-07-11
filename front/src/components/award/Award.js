import React, { useState, useContext } from "react";
import AwardCard from "./AwardCard";
import AwardForm from "./AwardForm";
import * as Api from "../../api";
import { AwardContext } from "./AwardContext";

const Award = ({ award, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { awards, setAwards } = useContext(AwardContext);
  async function handleDelete(e) {
    if (window.confirm("Are you sure?")) {
      e.preventDefault();
      e.stopPropagation();
      try {
        await Api.delete("awards", award.id);
        const idx = awards.findIndex((item) => item.id === award.id);
        awards.splice(idx, 1);
        setAwards([...awards]);
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <>
      {isEditing ? (
        <AwardForm setIsEditing={setIsEditing} currentAward={award} />
      ) : (
        <AwardCard
          award={award}
          portfolioOwnerId={award.userId}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Award;
