import bcrypt from "bcrypt"

const hashPassword = async (password, num) => {
  const hashedPassword = await bcrypt.hash(password, num)
  return hashedPassword
}

export { hashPassword }
