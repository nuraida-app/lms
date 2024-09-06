import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoFound = () => {
  const navigate = useNavigate();

  const toHome = () => navigate("/");
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper>
        <Box
          sx={{
            height: 500,
            width: 700,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>
            The page you are looking for in under construction
          </Typography>
          <Button variant="outlined" onClick={toHome}>
            Click here
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NoFound;
