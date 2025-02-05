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
import Loader from "./components/loader/Loader";
import TahfizAssess from "./tahfiz/penilaian/TahfizAssess";

const CbtBankList = lazy(() => import("./cbt/Bank/CbtBankList"));
const ListQuestions = lazy(() => import("./cbt/Bank/forms/ListQuestions"));
const AddQuestion = lazy(() => import("./cbt/Bank/forms/AddQuestion"));
const CbtSchedules = lazy(() => import("./cbt/jadwal/CbtSchedules"));
const CbtReport = lazy(() => import("./cbt/jadwal/laporan/CbtReport"));

const LmsMapel = lazy(() => import("./lms/LmsMapel"));
const LmsStudent = lazy(() => import("./lms/LmsStudent"));
const LmsMapelDetail = lazy(() => import("./lms/mapel/LmsMapelDetail"));

const CenterDash = lazy(() => import("./center/dashboard/CenterDash"));
const CenterAdmin = lazy(() => import("./center/admin/CenterAdmin"));
const CenterYears = lazy(() => import("./center/tapel/CenterYears"));
const CenterSch = lazy(() => import("./center/sekolah/CenterSch"));
const CenterGrade = lazy(() => import("./center/jenjang/CenterGrade"));
const CenterTeacher = lazy(() => import("./center/guru/CenterTeacher"));
const CenterStudent = lazy(() => import("./center/siswa/CenterStudent"));
const CenterDb = lazy(() => import("./center/database/CenterDb"));

const TahfizDash = lazy(() => import("./tahfiz/dahboard/TahfizDash"));
const TahfizAlquran = lazy(() => import("./tahfiz/index/TahfizAlquran"));
const TahfizMetriks = lazy(() => import("./tahfiz/metriks/TahfizMetriks"));
const TahfizAssessment = lazy(() => import("./tahfiz/penilaian/TahfizAssess"));
const TahfizExaminer = lazy(() => import("./tahfiz/penguji/TahfizExaminer"));
const TahfizReport = lazy(() => import("./tahfiz/laporan/TahfizReport"));
const ReportDetail = lazy(() => import("./tahfiz/laporan/ReportDetail"));
const TahfizStudent = lazy(() => import("./tahfiz/santri/TahfizStudent"));

const AdminDash = lazy(() => import("./admin/dashboard/AdminDash"));
const AdminGrade = lazy(() => import("./admin/tingkat/AdminGrade"));
const AdminClass = lazy(() => import("./admin/kelas/AdminClass"));
const AdminStudentList = lazy(() => import("./admin/kelas/AdminStudentList"));
const AdminSubjects = lazy(() => import("./admin/mapel/AdminSubjects"));
const AdminTeacher = lazy(() => import("./admin/guru/AdminTeacher"));
const AdminStudents = lazy(() => import("./admin/siswa/AdminStudents"));
const AdminDatabase = lazy(() => import("./admin/siswa/AdminDatabase"));

const TeacherDash = lazy(() => import("./guru/dahsboard/TeacherDash"));
const TeacherProfile = lazy(() => import("./guru/profil/TeacherProfile"));
const TeacherSubjects = lazy(() => import("./guru/mapel/TeacherSubjects"));
const TeacherDatabase = lazy(() => import("./guru/database/TeacherDatabase"));
const TeacherStudent = lazy(() => import("./guru/database/TeacherStudent"));

const StudentDash = lazy(() => import("./siswa/dashboard/StudentDash"));
const StudentExam = lazy(() => import("./siswa/ujian/StudentExam"));
const StudentExamPage = lazy(() => import("./cbt/ujian/CbtPage"));
const StudentData = lazy(() => import("./siswa/biodata/StudentData"));

const ParentDash = lazy(() => import("./wali/dashboard/ParentDash"));
const ParentBio = lazy(() => import("./wali/biodata/ParentBio"));

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
      <ToastContainer position="bottom-right" autoClose={4000} />
      <MetaData
        title={"Nuraida"}
        desc={
          "LMS mempermudah pembelajaran online dengan fitur interaktif. Solusi ideal untuk pengajar dan pelajar modern."
        }
      />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/signup" element={<SignUp />} />

          {/* CBT */}
          <Route path="/cbt-bank-soal" element={<CbtBankList />} />

          <Route
            path="/cbt-bank-soal/:name/:bankid"
            element={<ListQuestions />}
          />

          <Route
            path="/cbt-bank-soal/:name/tambah-soal/:bankid"
            element={<AddQuestion />}
          />

          <Route
            path="/cbt-bank-soal/:name/tambah-soal/:bankid/:questionid"
            element={<AddQuestion />}
          />

          <Route path="/cbt-ujian" element={<CbtSchedules />} />

          <Route
            path="/cbt-laporan/:name/:bankid/:gradeid"
            element={<CbtReport />}
          />

          {/* LMS */}
          <Route path="/lms-mapel" element={<LmsMapel />} />

          <Route path="/lms-mapel-siswa" element={<LmsStudent />} />

          <Route
            path="/lms-mapel/:id/:name/:code"
            element={<LmsMapelDetail />}
          />

          {/* Tahfiz */}
          <Route path="/tahfiz-dashboard" element={<TahfizDash />} />

          <Route path="/tahfiz-alquran" element={<TahfizAlquran />} />

          <Route path="/tahfiz-metriks" element={<TahfizMetriks />} />

          <Route path="/tahfiz-penilaian" element={<TahfizAssess />} />

          <Route path="/tahfiz-penguji" element={<TahfizExaminer />} />

          <Route path="/tahfiz-laporan" element={<TahfizReport />} />

          <Route path="/tahfiz-laporan/:nis/:name" element={<ReportDetail />} />

          <Route
            path="/tahfiz-laporan-siswa/:nis/:name"
            element={<TahfizStudent />}
          />

          {/* Center */}
          <Route path="/center-dashboard" element={<CenterDash />} />

          <Route path="/center-admin" element={<CenterAdmin />} />

          <Route path="/center-tapel" element={<CenterYears />} />

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

          <Route
            path="/admin-database/:name/:nis"
            element={<AdminDatabase />}
          />

          {/* Guru */}
          <Route path="/guru-dashboard" element={<TeacherDash />} />

          <Route path="/guru-profil" element={<TeacherProfile />} />

          <Route path="/guru-mapel" element={<TeacherSubjects />} />

          <Route path="/guru-database" element={<TeacherDatabase />} />

          <Route
            path="/guru-database/:name/:nis"
            element={<TeacherStudent />}
          />

          {/* Siswa */}
          <Route path="/siswa-dashboard" element={<StudentDash />} />

          <Route path="/cbt-jawdal-ujian" element={<StudentExam />} />

          <Route
            path="/cbt-halaman/:name/:bankId/:time"
            element={<StudentExamPage />}
          />

          <Route path="/siswa-biodata/:name/:nis" element={<StudentData />} />

          {/* Orang Tua */}
          <Route path="/wali-dashboard" element={<ParentDash />} />

          <Route
            path="/wali-biodata-siswa/:name/:nis"
            element={<ParentBio />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
