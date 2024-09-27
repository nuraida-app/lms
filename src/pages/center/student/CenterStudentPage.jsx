import React from "react";
import Layout from "../components/layout/Layout";
import { Paper } from "@mui/material";
import { useGetStudentsQuery } from "../../../state-control/api/studentApi";
import StudentTable from "./StudentTable";

const CenterStudentPage = () => {
  const { data, isLoading } = useGetStudentsQuery();

  return (
    <Layout>
      <Paper sx={{ p: 1 }}>
        <StudentTable students={data} loading={isLoading} />
      </Paper>
    </Layout>
  );
};

export default CenterStudentPage;
