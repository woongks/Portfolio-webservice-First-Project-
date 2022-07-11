const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1] ?? "null"

    if (!token) {
        next()
    } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    }
}

module.exports = verifyToken
