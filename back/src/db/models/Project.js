import { projectModel } from "../schemas/project";

class Project {
  static create = async ({ newProject }) => {
    console.log(newProject);
    const createdNewUser = await projectModel.create(newProject);
    return createdNewUser;
  };

  static findById = async ({ projectId }) => {
    const project = await projectModel.findOne({ id: projectId });
    return project;
  };

  static update = async ({ projectId, updateData }) => {
    const filter = { id: projectId };
    const update = updateData;
    const option = { returnOriginal: false };

    const updatedProject = await projectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  };

  static findByUserId = async ({ userId }) => {
    const projects = projectModel.find({ userId });
    return projects;
  };

  static deleteById = async ({ projectId }) => {
    const result = await projectModel.deleteOne({ id: projectId });
    const isDataDeleted = result.deletedCount === 1;
    return isDataDeleted;
  };
}

export { Project };
