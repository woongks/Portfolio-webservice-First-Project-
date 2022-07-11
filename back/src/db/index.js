import mongoose from "mongoose"

import { Education } from "./models/Education"
import { User } from "./models/User"
import { Project } from "./models/Project"
import { Award } from "./models/Award"
import { Certificate } from "./models/Certificate.js"
import { Like } from "./models/Like"
import { Board } from "./models/Board"
import { Career } from "./models/Career"
import { Follow } from "./models/Follow"

import dotenv from "dotenv"

dotenv.config()

const DB_URL =
    process.env.MONGODB_URL ||
    "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요."

mongoose.connect(DB_URL)
const db = mongoose.connection

db.on("connected", () =>
    console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
)
db.on("error", (error) =>
    console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
)

export {
    User,
    Project,
    Award,
    Certificate,
    Education,
    Like,
    Board,
    Follow,
    Career,
}
