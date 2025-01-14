import "./index.css";
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./components/otentikasi/SignIn";
import SignUp from "./components/otentikasi/SignUp";
import { useDispatch } from "react-redux";
import { useLoadMutation } from "./control/api/authApi";
import MetaData from "./components/meta/MetaData";
import { setLogin } from "./control/slice/authSlice";

const CbtBankList = lazy(() => import("./cbt/Bank/CbtBankList"));
const AddQuestion = lazy(() => import("./cbt/Bank/forms/AddQuestion"));
const CbtSchedules = lazy(() => import("./cbt/jadwal/CbtSchedules"));
const CbtReport = lazy(() => import("./cbt/jadwal/laporan/CbtReport"));

const LmsMapel = lazy(() => import("./lms/LmsMapel"));

const CenterDash = lazy(() => import("./center/dashboard/CenterDash"));
const CenterAdmin = lazy(() => import("./center/admin/CenterAdmin"));
const CenterSch = lazy(() => import("./center/sekolah/CenterSch"));
const CenterGrade = lazy(() => import("./center/jenjang/CenterGrade"));
const CenterTeacher = lazy(() => import("./center/guru/CenterTeacher"));
const CenterStudent = lazy(() => import("./center/siswa/CenterStudent"));
const CenterDb = lazy(() => import("./center/database/CenterDb"));

const AdminDash = lazy(() => import("./admin/dashboard/AdminDash"));
const AdminGrade = lazy(() => import("./admin/tingkat/AdminGrade"));
const AdminClass = lazy(() => import("./admin/kelas/AdminClass"));
const AdminStudentList = lazy(() => import("./admin/kelas/AdminStudentList"));
const AdminSubjects = lazy(() => import("./admin/mapel/AdminSubjects"));
const AdminTeacher = lazy(() => import("./admin/guru/AdminTeacher"));
const AdminStudents = lazy(() => import("./admin/siswa/AdminStudents"));

const TeacherProfile = lazy(() => import("./guru/profil/TeacherProfile"));
const TeacherSubjects = lazy(() => import("./guru/mapel/TeacherSubjects"));

const StudentExam = lazy(() => import("./siswa/ujian/StudentExam"));
const StudentExamPage = lazy(() => import("./cbt/ujian/CbtPage"));

function App() {
  const dispatch = useDispatch();
  const [load] = useLoadMutation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await load().unwrap();
        dispatch(setLogin(user));
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    fetchUser();
  }, [dispatch, load]);

  return (
    <BrowserRouter>
      <ToastContainer autoClose={2000} />
      <MetaData
        title={"Pilih Akun"}
        desc={
          "LMS mempermudah pembelajaran online dengan fitur interaktif. Solusi ideal untuk pengajar dan pelajar modern."
        }
      />
      <Suspense
        fallback={
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/signup" element={<SignUp />} />

          {/* CBT */}
          <Route path="/cbt-bank-soal" element={<CbtBankList />} />

          <Route path="/cbt-bank-soal/:id/soal" element={<AddQuestion />} />

          <Route path="/cbt-ujian" element={<CbtSchedules />} />

          <Route
            path="/cbt-laporan/:name/:bankid/:gradeid"
            element={<CbtReport />}
          />

          {/* LMS */}
          <Route path="/lms-mapel" element={<LmsMapel />} />

          {/* Center */}
          <Route path="/center-dashboard" element={<CenterDash />} />

          <Route path="/center-admin" element={<CenterAdmin />} />

          <Route path="/center-sekolah" element={<CenterSch />} />

          <Route path="/center-jenjang" element={<CenterGrade />} />

          <Route path="/center-guru" element={<CenterTeacher />} />

          <Route path="/center-siswa" element={<CenterStudent />} />

          <Route path="/center-database" element={<CenterDb />} />

          {/* Admin */}
          <Route path="/admin-dashboard" element={<AdminDash />} />

          <Route path="/admin-tingkat" element={<AdminGrade />} />

          <Route path="/admin-kelas" element={<AdminClass />} />

          <Route
            path="/admin-kelas-daftar-siswa/:gradeId/:name/:code"
            element={<AdminStudentList />}
          />

          <Route path="/admin-mapel" element={<AdminSubjects />} />

          <Route path="/admin-guru" element={<AdminTeacher />} />

          <Route path="/admin-siswa" element={<AdminStudents />} />

          {/* Guru */}
          <Route path="/guru-profil" element={<TeacherProfile />} />

          <Route path="/guru-mapel" element={<TeacherSubjects />} />

          {/* Siswa */}
          <Route path="/cbt-jawdal-ujian" element={<StudentExam />} />

          <Route
            path="/cbt-halaman/:name/:bankId/:start/:end"
            element={<StudentExamPage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
