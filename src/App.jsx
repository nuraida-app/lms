import "./index.css";
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./components/otentikasi/SignIn";
import SignUp from "./components/otentikasi/SignUp";

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

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={2000} />
      <Suspense fallback={"Loading ..."}>
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/signup" element={<SignUp />} />

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
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
