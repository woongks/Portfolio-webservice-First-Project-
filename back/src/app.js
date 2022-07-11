import cors from "cors"; // cors error prevention
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

import { projectRouter } from "./routers/projectRouter";
import { educationRouter } from "./routers/educationRouter";
import { awardRouter } from "./routers/awardRouter";
import { likeRouter } from "./routers/likeRouter";
import { boardRouter } from "./routers/boardRouter";
import { careerRouter } from "./routers/careerRouter";

import { followRouter } from "./routers/followRouter";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("안녕하세요, 포트폴리오 웹 서비스 API 입니다.");
});

app.use(userAuthRouter);

app.use(certificateRouter);
app.use(projectRouter);
app.use(awardRouter);
app.use(educationRouter);
app.use(likeRouter);
app.use(boardRouter);
app.use(careerRouter);
app.use(followRouter);
app.use(errorMiddleware);

export { app };
