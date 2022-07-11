import React, { useEffect, useState } from "react";
import { ProjectContext } from "./ProjectContext";
import * as Api from "../../api";
import Project from "./Project";
import ProjectForm from "./ProjectForm";
import pro from "../style/mvpCardBody.module.scss";

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("projectlist", portfolioOwnerId).then((res) =>
      setProjects(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      <div className={pro.mvpContainer}>
        <div className={pro.mvpContaineritle}>Project</div>
        {projects.map((project) => (
          <Project
            key={project?.id}
            project={project}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <div>
            <button className={pro.mvpBtn} onClick={() => setIsAdding(true)}>
              +
            </button>
          </div>
        )}
        {isAdding && (
          <ProjectForm
            portfolioOwnerId={portfolioOwnerId}
            setIsAdding={setIsAdding}
          />
        )}
      </div>
    </ProjectContext.Provider>
  );
}

export default Projects;
