import React from "react";
import Layout from "../component/layout/Layout";
import PageName from "../../PageName";
import { Grid } from "@mui/material";
import TeachersFunc from "./TeachersFunc";
import TeachersTable from "./TeachersTable";

const TeachersPage = () => {
  return (
    <Layout>
      <PageName title={"Teachers"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Grid item xs={12} md={12}>
          <TeachersTable />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default TeachersPage;
