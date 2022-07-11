import { userModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await userModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await userModel.findOne({ email });
    return user;
  }

  static async findById({ userId }) {
    const user = await userModel.findOne({ id: userId });
    return user;
  }

  static async findAll() {
    const users = await userModel.find({});
    return users;
  }

  static async update(userId, updateData) {
    const filter = { id: userId };
    const updateContent = updateData;
    const option = { returnOriginal: false };
    const updatedUser = await userModel.findOneAndUpdate(
      filter,
      updateContent,
      option
    );
    return updatedUser;
  }

  static removeUser = async ({ userId }) => {
    await userModel.deleteOne({ id: userId });
  };
}

export { User };
