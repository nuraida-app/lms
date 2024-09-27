import { Grid } from "@mui/material";
import React from "react";
import ListMenu from "../menu/ListMenu";
import Protect from "./Protect";

const Layout = ({ children }) => {
  Protect();
  return (
    <Grid container sx={{ height: "100vh", bgcolor: "#bdc3c7" }}>
      <Grid item xs={12} md={2}>
        <ListMenu />
      </Grid>
      <Grid item xs={12} md={10} sx={{ p: 1 }}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
