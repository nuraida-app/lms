import { Grid, Skeleton } from "@mui/material";
import PageName from "../../PageName";
import Layout from "../component/layout/Layout";
import GradesFunc from "./GradesFunc";
import GradesTable from "./GradesTable";
import { useGetGradesQuery } from "../../../state-control/api/gradeApi";

const GradesPage = () => {
  const { data, isLoading } = useGetGradesQuery();

  return (
    <Layout>
      <PageName title={"Grades"} />
      <Grid
        container
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Grid item xs={12} md={12}>
          <GradesFunc />
        </Grid>

        {isLoading ? (
          <Skeleton variant="rounded" height={530} />
        ) : (
          <Grid item xs={12} md={12}>
            <GradesTable grades={data} />
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default GradesPage;
