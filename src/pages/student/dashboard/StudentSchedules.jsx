import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import Schedule from "./Schedule";
import { useGetSchedulesByGradeQuery } from "../../../state-control/api/scheduleApi";
import { useSelector } from "react-redux";

const StudentSchedules = () => {
  const { user } = useSelector((state) => state.authentication);
  const { data } = useGetSchedulesByGradeQuery(user?.grade_id, {
    skip: !user?.grade_id,
  });

  return (
    <Box
      sx={{
        borderRadius: 2,
        height: 500,
        overflow: "auto",
      }}
    >
      <Paper sx={{ p: 1 }}>
        <Typography variant="h6">Schedules</Typography>
      </Paper>

      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {data?.map((item, index) => (
          <Schedule key={index} data={item} />
        ))}
      </Box>
    </Box>
  );
};

export default StudentSchedules;
