import React, { useState, useContext } from "react";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import * as Api from "../../api";
import { ProjectContext } from "./ProjectContext";

function Project({ project, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const { projects, setProjects } = useContext(ProjectContext);
  async function handleDelete(e) {
    if (window.confirm("Are you sure?")) {
      e.preventDefault();
      e.stopPropagation();
      try {
        await Api.delete("projects", project.id);
        const idx = projects.findIndex((item) => item.id === project.id);
        projects.splice(idx, 1);
        setProjects([...projects]);
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <>
      {isEditing ? (
        <ProjectForm setIsEditing={setIsEditing} currentProject={project} />
      ) : (
        <ProjectCard
          project={project}
          portfolioOwnerId={project.userId}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}

export default Project;
