import React from "react";
import Layout from "../components/layout/Layout";
import { Box, Paper, Typography } from "@mui/material";
import {
  useGetAdminQuery,
  useGetUserDataQuery,
} from "../../../state-control/api/adminApi";
import DataOne from "./DataOne";
import DataTwo from "./DataTwo";

const Center = () => {
  const { data: admin } = useGetAdminQuery();
  const { data } = useGetUserDataQuery();

  return (
    <Layout>
      <Paper sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
        <Typography fontWeight="bold">{admin?.name}</Typography>
        <Typography fontWeight="bold">{admin?.email}</Typography>
      </Paper>

      <Paper sx={{ p: 1, mt: 1, mb: 1 }}>
        <DataOne data={data} />
      </Paper>

      <DataTwo />
    </Layout>
  );
};

export default Center;
