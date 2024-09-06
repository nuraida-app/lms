import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

const Parents = () => {
  return (
    <div className="wrapper">
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1 }}
        >
          <Typography fontWeight="bold">Father</Typography>

          <TextField label="Full Name" />

          <TextField label="Birth Day" />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1 }}
        >
          <Typography fontWeight="bold">Mother</Typography>

          <TextField label="Full Name" />

          <TextField label="Birth Day" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Parents;
