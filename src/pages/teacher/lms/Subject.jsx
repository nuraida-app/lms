import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Chapter from "./Chapter";
import { useGetChaptersQuery } from "../../../state-control/api/lmsApi";
import Chapters from "./Chapters";

const Subject = () => {
  const params = useParams();
  const name = params.name.replace(/-/g, " ");
  const code = params.code;

  const { data } = useGetChaptersQuery(code, { skip: !code });

  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <Paper sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
      </Paper>

      <Box alignSelf="flex-start" sx={{ my: 1 }}>
        <Button
          startIcon={<AddOutlinedIcon />}
          variant="contained"
          color="success"
          onClick={() => setOpen(true)}
        >
          Bab
        </Button>
      </Box>

      {data &&
        data?.map((item, index) => (
          <Chapters key={item.id} data={item} number={index + 1} />
        ))}

      <Chapter open={open} close={() => setOpen(false)} />
    </Layout>
  );
};

export default Subject;
