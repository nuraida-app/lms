import React from "react";
import Layout from "../component/layout/Layout";
import PageName from "../../PageName";
import { Grid } from "@mui/material";
import HomebaseFunc from "./HomebaseFunc";
import HomebaseTable from "./HomebaseTable";

const HomebasePage = () => {
  return (
    <Layout>
      <PageName title={"Homebase"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <HomebaseFunc />

        <HomebaseTable />
      </Grid>
    </Layout>
  );
};

export default HomebasePage;
