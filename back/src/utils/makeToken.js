import dotenv from "dotenv"
dotenv.config()

import jwt from "jsonwebtoken"

const makeToken = (object) => {
  const token = jwt.sign(object, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  })
  return token
}

export { makeToken }
