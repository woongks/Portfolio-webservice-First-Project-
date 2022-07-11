import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class ProjectService {
  static addProject = async ({
    userId,
    title,
    description,
    fromDate,
    toDate,
  }) => {
    const id = uuidv4();
    const newProject = { userId, title, description, fromDate, toDate, id };
    const createdProject = await Project.create({ newProject });
    return createdProject;
  };

  static getProject = async ({ projectId }) => {
    const project = await Project.findById({ projectId });

    if (!project) {
      const errorMessage =
        "해당 id를 가진 프로젝트는 없습니다. 다시 한 번 확인해 주세요";
      return { errorMessage };
    }

    return project;
  };

  static updateProject = async ({ projectId, updateData }) => {
    let project = await Project.findById({ projectId });

    if (!project) {
      const errorMessage =
        "해당 id를 가진 프로젝트는 없습니다. 다시 한 번 확인해 주세요";
      return { errorMessage };
    }

    const projects = await Project.update({
      projectId,
      updateData,
    });
    return projects;
  };

  static getProjectList = async ({ userId }) => {
    const projects = await Project.findByUserId({ userId });
    return projects;
  };

  static deleteProject = async ({ projectId }) => {
    const deletedProject = await Project.deleteById({ projectId });

    if (!deletedProject) {
      const errorMessage =
        "해당 id를 가진 프로젝트는 없습니다. 다시 한 번 확인해 주세요";
      return { errorMessage };
    }
    return {
      sataus: "success",
    };
  };
}

export { ProjectService };
