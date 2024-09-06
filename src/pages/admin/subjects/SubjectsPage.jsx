import React from "react";
import Layout from "../component/layout/Layout";
import PageName from "../../PageName";
import { Grid, Skeleton, Stack } from "@mui/material";
import SubjectsTable from "./SubjectsTable";
import { useGetSubjectsQuery } from "../../../state-control/api/subjectApi";

const SubjectsPage = () => {
  const { data, isLoading } = useGetSubjectsQuery();

  return (
    <Layout>
      <PageName title={"Subjects"} />
      <Grid
        container
        sx={{
          minHeight: "84vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid item xs={12} md={12}>
          {isLoading ? (
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} />

              <Skeleton
                variant="rounded"
                sx={{ height: { xs: 500, md: 540, xl: 640 } }}
              />
            </Stack>
          ) : (
            <SubjectsTable subjects={data} />
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SubjectsPage;
