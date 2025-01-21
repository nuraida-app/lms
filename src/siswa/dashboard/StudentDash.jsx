import React from "react";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";
import StudentProfile from "../profil/StudentProfile";

const StudentDash = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout title={user?.name}>
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <StudentProfile />
      </div>
    </Layout>
  );
};

export default StudentDash;
