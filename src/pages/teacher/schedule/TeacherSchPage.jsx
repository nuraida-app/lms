import Layout from "../components/layout/Layout";
import PageName from "../../PageName";
import { Grid } from "@mui/material";
import ScheduleTable from "./ScheduleTable";

const TeacherSchPage = () => {
  return (
    <Layout>
      <PageName title={"Schedule"} />

      <Grid
        container
        sx={{
          minHeight: "82vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Grid item xs={12} md={12}>
          <ScheduleTable />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default TeacherSchPage;
