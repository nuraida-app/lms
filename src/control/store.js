import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import { subjectApi } from "./api/subjectApi";
import { yearApi } from "./api/yearApi";
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
import { homebaseApi } from "./api/homebaseApi";
import { lmsApi } from "./api/lmsApi";
import { authApi } from "./api/authApi";
import { quranApi } from "./api/quranApi";
import { metricsApi } from "./api/metricApi";
import { scoreApi } from "./api/scoreApi";
import { examinerApi } from "./api/examinerApi";
import { reportApi } from "./api/reportApi";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [homebaseApi.reducerPath]: homebaseApi.reducer,
    [yearApi.reducerPath]: yearApi.reducer,
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
    [lmsApi.reducerPath]: lmsApi.reducer,
    [quranApi.reducerPath]: quranApi.reducer,
    [metricsApi.reducerPath]: metricsApi.reducer,
    [scoreApi.reducerPath]: scoreApi.reducer,
    [examinerApi.reducerPath]: examinerApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      homebaseApi.middleware,
      yearApi.middleware,
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
      homebaseApi.middleware,
      lmsApi.middleware,
      quranApi.middleware,
      metricsApi.middleware,
      scoreApi.middleware,
      examinerApi.middleware,
      reportApi.middleware,
    ]),
});

export default store;
