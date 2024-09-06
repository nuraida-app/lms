import React from "react";
import Layout from "../components/layout/Layout";
import PageName from "../../PageName";
import { Box, Grid } from "@mui/material";
import StudentData from "./StudentData";
import StudentSchedules from "./StudentSchedules";
import Announcements from "./Announcements";

const StudentDashboard = () => {
  return (
    <Layout>
      <PageName title={"Student Dashboard"} />
      <Grid container sx={{ height: "85vh" }}>
        <Grid item xs={12} md={9} sx={{ p: 1 }}>
          <Box sx={{ height: { md: 580, xl: 660 }, overflow: "auto" }}>
            {/* <StudentData /> */}

            <Announcements />
          </Box>
        </Grid>
        <Grid item xs={12} md={3} sx={{ p: 1 }}>
          <StudentSchedules />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default StudentDashboard;
