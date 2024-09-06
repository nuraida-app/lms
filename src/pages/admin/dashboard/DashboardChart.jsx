import { Grid, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useGetDemographicQuery } from "../../../state-control/api/dbApi";
import DataTable from "./DataTable";

const DashboardChart = () => {
  const { data } = useGetDemographicQuery();
  return (
    <Fragment>
      <Paper sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight={600}>
          Demographic Data
        </Typography>
      </Paper>
      <Grid container sx={{ bgcolor: "white", borderRadius: 1, boxShadow: 2 }}>
        <Grid item xs={12} md={6} sx={{ p: 1 }}>
          <Typography fontWeight="bold">Provinces</Typography>
          <DataTable type={data?.provinces} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ p: 1 }}>
          <Typography fontWeight="bold">Regencies</Typography>

          <DataTable type={data?.regencies} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ p: 1 }}>
          <Typography fontWeight="bold">Districts</Typography>

          <DataTable type={data?.districts} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ p: 1 }}>
          <Typography fontWeight="bold">Villages</Typography>

          <DataTable type={data?.villages} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DashboardChart;
