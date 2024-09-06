import { Box, Grid } from "@mui/material";
import Layout from "../component/layout/Layout";
import DashboardData from "./DashboardData";
import DashboardChart from "./DashboardChart";
import PageName from "../../PageName";

const DashboardPage = () => {
  return (
    <Layout>
      <PageName title={"Dashboard"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <DashboardData />

        <DashboardChart />
      </Grid>
    </Layout>
  );
};

export default DashboardPage;
