import { Box, Paper, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Schedule = ({ data }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-EN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(date);
    } catch (error) {
      console.error("Invalid date string:", dateString);
      return "Invalid date";
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        gap: 1,
        p: 1,
        borderLeft: "4px solid red",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box>
          <Typography fontWeight="bold" color={"#4D44B5"}>
            {data?.quiz}
          </Typography>

          <Typography fontSize={14} variant="body1" color="textSecondary">
            {data?.teacher}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <CalendarMonthIcon color="#4D44B5" />
          <Box>
            <Typography fontSize={10}>{formatDate(data?.start)}</Typography>
            <Typography fontSize={10}>{formatDate(data?.end)}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Schedule;
