import bcrypt from "bcrypt";

const verifyPassword = async (password, userPassword) => {
  const isPasswordCorrect = await bcrypt.compare(password, userPassword);
  return isPasswordCorrect;
};

export { verifyPassword };
