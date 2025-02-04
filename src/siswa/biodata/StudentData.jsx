import React from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import FormPage from "../../database/form/FormPage";

const StudentData = () => {
  const params = useParams();
  const { name } = params;
  return (
    <Layout title={`Data ${name.replace(/\-/g, " ")}`}>
      <FormPage />
    </Layout>
  );
};

export default StudentData;
