import { ListItemText, Paper } from "@mui/material";
const Topics = ({ data, number }) => {
  return (
    <Paper sx={{ p: 1, mx: 8 }}>
      <ListItemText
        primary={`Topic ${1}: ${data.title}`}
        secondary={data.goal}
      />
    </Paper>
  );
};

export default Topics;
