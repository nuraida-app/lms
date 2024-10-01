import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import { loadUser } from "./state-control/api/authApi";
import Loader from "./Loader";

const Login = lazy(() => import("./pages/Login"));
const DashboardPage = lazy(() =>
  import("./pages/admin/dashboard/DashboardPage")
);
const HomebasePage = lazy(() => import("./pages/admin/homebase/HomebasePage"));
const SubjectsPage = lazy(() => import("./pages/admin/subjects/SubjectsPage"));
const TeachersPage = lazy(() => import("./pages/admin/teachers/TeachersPage"));
const GradesPage = lazy(() => import("./pages/admin/grades/GradesPage"));
const ClassesPage = lazy(() => import("./pages/admin/classes/ClassesPage"));
const ClassAddStudents = lazy(() =>
  import("./pages/admin/classes/ClassAddStudents")
);
const StudentsPage = lazy(() => import("./pages/admin/students/StudentsPage"));
const QuizzesPage = lazy(() => import("./pages/admin/quizzes/QuizzesPage"));
const QuestionsPage = lazy(() =>
  import("./pages/admin/quizzes/questions/QuestionsPage")
);
const QuestionAdd = lazy(() =>
  import("./pages/admin/quizzes/questions/QuestionAdd")
);
const QuestionEdit = lazy(() =>
  import("./pages/admin/quizzes/questions/QuestionEdit")
);
const SchedulePage = lazy(() => import("./pages/admin/schedules/SchedulePage"));
const DetailPage = lazy(() =>
  import("./pages/admin/schedules/detail/DetailPage")
);
const StudentDashboard = lazy(() =>
  import("./pages/student/dashboard/StudentDashboard")
);
const StudentSettingPage = lazy(() =>
  import("./pages/student/setting/StudentSettingPage")
);
const StudentSubjectPage = lazy(() =>
  import("./pages/student/subjects/StudentSubjectPage")
);
const StudentQuizPage = lazy(() =>
  import("./pages/student/quizzes/StudentQuizPage")
);
const LearningPage = lazy(() =>
  import("./pages/student/subjects/LearningPage")
);
const QuizPage = lazy(() => import("./pages/student/quizzes/quiz/QuizPage"));
const Discussion = lazy(() => import("./pages/student/subjects/Discussion"));
const TeacherDashboard = lazy(() =>
  import("./pages/teacher/dashboard/TeacherDashboard")
);
const TeacherQuizPage = lazy(() =>
  import("./pages/teacher/quiz/TeacherQuizPage")
);
const TeacherQuestionPage = lazy(() =>
  import("./pages/teacher/quiz/questions/TeacherQuestionPage")
);
const TeacherQuestionAdd = lazy(() =>
  import("./pages/teacher/quiz/questions/TeacherQuestionAdd")
);
const TeacherQuestionEdit = lazy(() =>
  import("./pages/teacher/quiz/questions/TeacherQuestionEdit")
);
const TeacherSchPage = lazy(() =>
  import("./pages/teacher/schedule/TeacherSchPage")
);
const TeacherDetailPage = lazy(() =>
  import("./pages/teacher/schedule/detail/TeacherDetailPage")
);
const DatabasePage = lazy(() =>
  import("./pages/teacher/database/DatabasePage")
);
const DbStudent = lazy(() => import("./pages/teacher/database/DbStudent"));
const StudentProfile = lazy(() =>
  import("./pages/student/profile/StudentProfile")
);
const NoFound = lazy(() => import("./pages/NoFound"));

// Admin Center
const Center = lazy(() => import("./pages/center/dashboard/Center"));
const CenterTeacherPage = lazy(() =>
  import("./pages/center/teacher/CenterTeacherPage")
);
const CenterStudentPage = lazy(() =>
  import("./pages/center/student/CenterStudentPage")
);
const CenterStatistic = lazy(() =>
  import("./pages/center/statistics/CenterStatistic")
);
const CenterAdminPage = lazy(() =>
  import("./pages/center/admin/CenterAdminPage")
);

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authentication);

  useEffect(() => {
    const load = JSON.parse(localStorage.getItem("login"));

    if (load) {
      dispatch(loadUser());
    }
  }, [dispatch, user?.role]);
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<NoFound />} />

          <Route path="/" element={<Login />} />

          <Route path="/admin/dashboard" element={<DashboardPage />} />

          <Route path="/admin/homebase" element={<HomebasePage />} />

          <Route path="/admin/subjects" element={<SubjectsPage />} />

          <Route path="/admin/teachers" element={<TeachersPage />} />

          <Route path="/admin/grades" element={<GradesPage />} />

          <Route path="/admin/classes" element={<ClassesPage />} />

          <Route
            path="/admin/classes/grade/:gradeId/class-code/:code/add-students"
            element={<ClassAddStudents />}
          />

          <Route path="/admin/students" element={<StudentsPage />} />

          <Route path="/admin/quizzes" element={<QuizzesPage />} />

          <Route
            path="/admin/quizzes/:quizname/:quizId"
            element={<QuestionsPage />}
          />

          <Route
            path="/admin/quizzes/add/:quizname/:quizId"
            element={<QuestionAdd />}
          />

          <Route
            path="/admin/quizzes/edit/:quizname/:quizId/question/:questionId"
            element={<QuestionEdit />}
          />

          <Route path="/admin/schedules" element={<SchedulePage />} />

          <Route
            path="/admin/schedules/:quizname/:quizId/:gradeId"
            element={<DetailPage />}
          />
          {/* Teacher */}

          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

          <Route path="/teacher/database" element={<DatabasePage />} />

          <Route path="/teacher/:studentName/:nis" element={<DbStudent />} />

          <Route path="/teacher/quizzes" element={<TeacherQuizPage />} />

          <Route
            path="/teacher/quizzes/:quizname/:quizId"
            element={<TeacherQuestionPage />}
          />

          <Route
            path="/teacher/quizzes/add/:quizname/:quizId"
            element={<TeacherQuestionAdd />}
          />

          <Route
            path="/teacher/quizzes/edit/:quizname/:quizId/question/:questionId"
            element={<TeacherQuestionEdit />}
          />

          <Route path="/teacher/schedules" element={<TeacherSchPage />} />

          <Route
            path="/teacher/schedules/:quizname/:quizId/:gradeId"
            element={<TeacherDetailPage />}
          />

          {/* Student */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          <Route path="/student/setting" element={<StudentSettingPage />} />

          <Route path="/student/profile" element={<StudentProfile />} />

          <Route path="/student/subjects" element={<StudentSubjectPage />} />

          <Route path="/student/subjects/subject" element={<LearningPage />} />

          <Route
            path="/student/subjects/subject/discussion"
            element={<Discussion />}
          />

          <Route path="/student/exam" element={<StudentQuizPage />} />

          <Route
            path="/student/exam/:quizname/:quizId/:start/:end"
            element={<QuizPage />}
          />

          {/* Admin Center */}

          <Route path="/admin-center" element={<Center />} />

          <Route path="/admin-center/admin" element={<CenterAdminPage />} />

          <Route
            path="/admin-center/teachers"
            element={<CenterTeacherPage />}
          />

          <Route
            path="/admin-center/students"
            element={<CenterStudentPage />}
          />

          <Route path="/admin-center/statistic" element={<CenterStatistic />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
