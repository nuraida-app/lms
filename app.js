import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import useragent from "express-useragent";

// Routers
import authRouter from "./router/auth/authRouter.js";
import adminRouter from "./router/auth/adminRouter.js";
import homebaseRouter from "./router/akademik/homebaseRouter.js";
import classRouter from "./router/akademik/classRouter.js";
import gradeRouter from "./router/akademik/gradeRouter.js";
import subjectRouter from "./router/akademik/subjectRouter.js";
import teacherRouter from "./router/akademik/teacherRouter.js";
import studentRouter from "./router/akademik/studentRouter.js";
import quizRouter from "./router/cbt/quizRouter.js";
import questionRouter from "./router/cbt/questionRouter.js";
import scheduleRouter from "./router/cbt/scheduleRouter.js";
import uploadRouter from "./router/uploadRouter.js";
import answerRouter from "./router/cbt/answerRouter.js";
import logRouter from "./router/cbt/logRouter.js";
import dbRouter from "./router/dbRouter.js";
import lmsRouter from "./router/lms/lmsRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: [
      process.env.DOMAIN_1,
      process.env.DOMAIN_2,
      process.env.DOMAIN_3,
      process.env.DOMAIN_4,
      process.env.DOMAIN_5,
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(useragent.express());

app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/homebase", homebaseRouter);
app.use("/grade", gradeRouter);
app.use("/class", classRouter);
app.use("/subject", subjectRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/quiz", quizRouter);
app.use("/question", questionRouter);
app.use("/schedule", scheduleRouter);
app.use("/upload", uploadRouter);
app.use("/answer", answerRouter);
app.use("/log", logRouter);
app.use("/database", dbRouter);
app.use("/lms", lmsRouter);

export default app;
