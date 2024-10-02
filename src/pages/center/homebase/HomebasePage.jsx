import React from "react";
import Layout from "../components/layout/Layout";
import PageName from "../../PageName";
import { Grid } from "@mui/material";
import HomebaseFunc from "./HomebaseFunc";
import HomebaseTable from "./HomebaseTable";
import { useGetHomebasesQuery } from "../../../state-control/api/homebaseApi";

const HomebasePage = () => {
  const { data } = useGetHomebasesQuery();

  return (
    <Layout>
      <PageName title={"Homebase"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <HomebaseFunc />

        <HomebaseTable data={data} />
      </Grid>
    </Layout>
  );
};

export default HomebasePage;
