import React from "react";
import Layout from "../components/layout/Layout";
import PageName from "../../PageName";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetChaptesClassQuery } from "../../../state-control/api/lmsApi";
import Chapters from "./Chapters";

const LearningPage = () => {
  const navigate = useNavigate();
  const { data: chapters } = useGetChaptesClassQuery();

  const toDiscussion = () => navigate("/student/subjects/subject/discussion");
  return (
    <Layout>
      <PageName title={"Subject"} />

      <Box
        container
        sx={{
          height: "85vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {chapters?.map((chapter, index) => (
          <Chapters key={index} data={chapter} number={index + 1} />
        ))}
      </Box>
    </Layout>
  );
};

export default LearningPage;
