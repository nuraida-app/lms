import React from "react";
import Layout from "../components/Layout";
import FormPage from "../../database/form/FormPage";
import { useParams } from "react-router-dom";

const ParentBio = () => {
  const params = useParams();
  const { name } = params;
  return (
    <Layout title={`Biodata ${name.replace(/\-/g, " ")}`}>
      <FormPage />
    </Layout>
  );
};

export default ParentBio;
