import React from "react";
import Layout from "../components/layout/Layout";
import PageName from "../../PageName";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LearningPage = () => {
  const navigate = useNavigate();

  const toDiscussion = () => navigate("/student/subjects/subject/discussion");
  return (
    <Layout>
      <PageName title={"Subject"} />

      <Box container sx={{ height: "85vh", overflow: "auto" }}>
        <Card sx={{ width: 250 }}>
          <CardActionArea onClick={() => toDiscussion()}>
            <CardContent>
              <Typography color="textSecondary" fontSize={10}>
                Discussion / Material
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Present Continuous
              </Typography>
              <Typography color="textSecondary">Teacher Name</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Layout>
  );
};

export default LearningPage;
