import React from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import FormPage from "../../database/form/FormPage";

const TeacherStudent = () => {
  const params = useParams();
  const { name } = params;
  const formatted = name.replace(/\-/g, " ");
  return (
    <Layout title={`Database ${formatted}`}>
      <FormPage />
    </Layout>
  );
};

export default TeacherStudent;
