import { Box, ListItemText, Paper } from "@mui/material";
const Topics = ({ data, number }) => {
  return (
    <Box sx={{ p: 1, mx: 8, boxShadow: 4, borderRadius: 1 }}>
      <ListItemText
        primary={`Topic ${number}: ${data.title}`}
        secondary={data.goal}
      />
    </Box>
  );
};

export default Topics;
