import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import { subjectApi } from "./api/subjectApi";
import { gradeApi } from "./api/gradeApi";
import { classApi } from "./api/classApi";
import { teacherApi } from "./api/teacherApi";
import { studentApi } from "./api/studentApi";
import { quizApi } from "./api/quizApi";
import { questionApi } from "./api/questionApi";
import { scheduleApi } from "./api/scheduleApi";
import { answerApi } from "./api/answerApi";
import { logApi } from "./api/logApi";
import { dbApi } from "./api/dbApi";
import { adminApi } from "./api/adminApi";
import { mediaApi } from "./api/mediaApi";

const store = configureStore({
  reducer: {
    authentication: authSlice,
    [gradeApi.reducerPath]: gradeApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [subjectApi.reducerPath]: subjectApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [answerApi.reducerPath]: answerApi.reducer,
    [logApi.reducerPath]: logApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      gradeApi.middleware,
      classApi.middleware,
      subjectApi.middleware,
      teacherApi.middleware,
      studentApi.middleware,
      quizApi.middleware,
      questionApi.middleware,
      scheduleApi.middleware,
      answerApi.middleware,
      logApi.middleware,
      dbApi.middleware,
      adminApi.middleware,
      mediaApi.middleware,
    ]),
});

export default store;
