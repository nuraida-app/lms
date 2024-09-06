import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import DashboardPage from "./pages/admin/dashboard/DashboardPage";
import HomebasePage from "./pages/admin/homebase/HomebasePage";
import SubjectsPage from "./pages/admin/subjects/SubjectsPage";
import TeachersPage from "./pages/admin/teachers/TeachersPage";
import GradesPage from "./pages/admin/grades/GradesPage";
import ClassesPage from "./pages/admin/classes/ClassesPage";
import ClassAddStudents from "./pages/admin/classes/ClassAddStudents";
import StudentsPage from "./pages/admin/students/StudentsPage";
import QuizzesPage from "./pages/admin/quizzes/QuizzesPage";
import QuestionsPage from "./pages/admin/quizzes/questions/QuestionsPage";
import QuestionAdd from "./pages/admin/quizzes/questions/QuestionAdd";
import QuestionEdit from "./pages/admin/quizzes/questions/QuestionEdit";
import SchedulePage from "./pages/admin/schedules/SchedulePage";
import DetailPage from "./pages/admin/schedules/detail/DetailPage";
import StudentDashboard from "./pages/student/dashboard/StudentDashboard";
import StudentSettingPage from "./pages/student/setting/StudentSettingPage";
import StudentSubjectPage from "./pages/student/subjects/StudentSubjectPage";
import StudentQuizPage from "./pages/student/quizzes/StudentQuizPage";
import LearningPage from "./pages/student/subjects/LearningPage";
import QuizPage from "./pages/student/quizzes/quiz/QuizPage";
import Discussion from "./pages/student/subjects/Discussion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./state-control/api/authApi";
import TeacherDashboard from "./pages/teacher/dashboard/TeacherDashboard";
import TeacherQuizPage from "./pages/teacher/quiz/TeacherQuizPage";
import TeacherQuestionPage from "./pages/teacher/quiz/questions/TeacherQuestionPage";
import TeacherQuestionAdd from "./pages/teacher/quiz/questions/TeacherQuestionAdd";
import TeacherQuestionEdit from "./pages/teacher/quiz/questions/TeacherQuestionEdit";
import TeacherSchPage from "./pages/teacher/schedule/TeacherSchPage";
import TeacherDetailPage from "./pages/teacher/schedule/detail/TeacherDetailPage";
import DatabasePage from "./pages/teacher/database/DatabasePage";
import DbStudent from "./pages/teacher/database/DbStudent";
import StudentProfile from "./pages/student/profile/StudentProfile";
import NoFound from "./pages/NoFound";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
