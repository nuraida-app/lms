import React from "react";
import Layout from "../components/layout/Layout";
import CbtList from "../../cbt/ujian/CbtList";

const StudentExam = () => {
  return (
    <Layout title={"Jadwal Ujian"}>
      <CbtList />
    </Layout>
  );
};

export default StudentExam;
