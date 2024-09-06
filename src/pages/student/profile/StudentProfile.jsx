import React from "react";
import Layout from "../components/layout/Layout";
import PageName from "../../PageName";
import { Box } from "@mui/material";
import { useGetProfileQuery } from "../../../state-control/api/studentApi";
import Profile from "./Profile";

const StudentProfile = () => {
  const { data } = useGetProfileQuery();
  return (
    <Layout>
      <PageName title={"Student Dashboard"} />
      <Box sx={{ minHeight: "85vh" }}>
        <Profile profile={data} />
      </Box>
    </Layout>
  );
};

export default StudentProfile;
