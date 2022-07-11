import { User } from "../db";

import { v4 as uuidv4 } from "uuid";

import { makeToken } from "../utils/makeToken";
import { hashPassword } from "../utils/hashPassword";
import { verifyPassword } from "../utils/verifyPassword";

class UserAuthService {
  static async addUser({ name, email, password }) {
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    const hashedPassword = await hashPassword(password, 10);

    const id = uuidv4();
    const newUser = { id, name, email, password: hashedPassword };

    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null;

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const verifiedPassword = await verifyPassword(password, user.password);
    console.log(verifiedPassword);
    if (!verifiedPassword) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const token = makeToken({ userId: user.id });

    const id = user.id;
    const name = user.name;
    const description = user.description;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  static async updateUser({ userId, toUpdate }) {
    let user = await User.findById({ userId });

    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const email = toUpdate.email;
    let checkEmail = await User.findByEmail({ email });

    if (checkEmail) {
      const errorMessage = "이미 가입되어 있는 email입니다.";
      return { errorMessage };
    }

    if (toUpdate.newPassword === undefined) {
      const updateData = {
        email: toUpdate.email,
        description: toUpdate.description,
        name: toUpdate.name,
      };
      user = await User.update(userId, updateData);
      return user;
    }
    const verifiedPassword = await verifyPassword(
      toUpdate.newPassword,
      user.password
    );

    if (verifiedPassword) {
      const errorMessage = "현재 비밀번호와 같습니다.";
      return { errorMessage };
    }

    if (toUpdate.newPassword && toUpdate.newPassword.length < 4) {
      const errorMessage =
        "비밀번호가 너무 짧습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    if (toUpdate.newPassword) {
      toUpdate.newPassword = await hashPassword(toUpdate.newPassword, 10);
      const updateData = {
        email: toUpdate.email,
        description: toUpdate.description,
        name: toUpdate.name,
        password: toUpdate.newPassword,
      };
      user = await User.update(userId, updateData);
      return user;
    }
    return user;
  }

  static async getUserInfo({ userId }) {
    const user = await User.findById({ userId });

    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }

  static deleteUser = async ({ userId }) => {
    const user = User.findById({ userId });

    if (!user) {
      const errorMessage = "해당 id로 가입된 유저가 없습니다.";
      return { errorMessage };
    }

    await User.removeUser({ userId });
    return {
      status: "success",
    };
  };

  static passwordTest = async ({ userId, currentPassword }) => {
    let user = await User.findById({ userId });

    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const verifiedPassword = await verifyPassword(
      currentPassword,
      user.password
    );

    if (verifiedPassword) {
      return true;
    } else {
      return false;
    }
  };
}

export { UserAuthService };
