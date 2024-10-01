import React from "react";
// import { BarChart } from "@mui/x-charts/BarChart";
import { useGetDemographicQuery } from "../../../state-control/api/dbApi";
import BarChart from "./BarChart";
import { Box, Grid, Paper, Typography } from "@mui/material";

const DataTwo = () => {
  const { data, isLoading } = useGetDemographicQuery();

  const provinces = data?.provinces;
  const cities = data?.regencies;

  return (
    <Grid container>
      <Grid item xs={12} md={6} sx={{ p: 1 }}>
        <Paper sx={{ p: 1 }}>
          <Typography align="center" fontWeight="bold">
            Provinces
          </Typography>
          {data && <BarChart data={provinces} />}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} sx={{ p: 1 }}>
        <Paper sx={{ p: 1 }}>
          <Typography align="center" fontWeight="bold">
            Cities
          </Typography>
          {data && <BarChart data={cities} />}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DataTwo;
