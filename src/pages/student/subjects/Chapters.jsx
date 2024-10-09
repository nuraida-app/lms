import { ListItemText, Paper } from "@mui/material";
import { useGetTopicsQuery } from "../../../state-control/api/lmsApi";
import Topics from "./Topics";

const Chapters = ({ data, number }) => {
  const { data: topics } = useGetTopicsQuery(data.id, { skip: !data.id });
  return (
    <Paper sx={{ p: 1 }}>
      <ListItemText
        primary={`Chapter ${number}: ${data.title}`}
        secondary={data.goal}
      />

      {topics?.map((topic, index) => (
        <Topics key={index} data={topic} number={index + 1} />
      ))}
    </Paper>
  );
};

export default Chapters;
