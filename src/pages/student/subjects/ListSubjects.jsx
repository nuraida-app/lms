import { Box, Button, ListItemText, Paper } from "@mui/material";
import React from "react";
import { useGetSubjectsClassQuery } from "../../../state-control/api/subjectApi";
import { useNavigate } from "react-router-dom";

const ListSubjects = () => {
  const navigate = useNavigate();

  const { data: subjects } = useGetSubjectsClassQuery();

  const toPage = (code, name) => navigate(`/student/subjects/${code}/${name}`);

  return (
    <>
      {subjects?.map((subject, index) => (
        <Paper key={index} sx={{ p: 1, width: "25%" }}>
          <ListItemText
            primary={subject.name}
            secondary={`${subject.chapter_count} Chapters ${subject.topic_count} Topics`}
          />

          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              size="small"
              variant="contained"
              onClick={() => toPage(subject.code, subject.name)}
            >
              Learn
            </Button>
          </Box>
        </Paper>
      ))}
    </>
  );
};

export default ListSubjects;
