import Layout from "../component/layout/Layout";
import PageName from "../../PageName";
import { Grid } from "@mui/material";
import ScheduleFunc from "./ScheduleFunc";
import ScheduleTable from "./ScheduleTable";

const SchedulePage = () => {
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

export default SchedulePage;
