import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItemText,
  Paper,
} from "@mui/material";
import { useGetTopicsQuery } from "../../../state-control/api/lmsApi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Topics from "./Topics";

const Chapters = ({ data, number }) => {
  const { data: topics } = useGetTopicsQuery(data.id, { skip: !data.id });
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ListItemText
            primary={`Chapter ${number}: ${data.title}`}
            secondary={data.goal}
          />
        </AccordionSummary>

        {topics?.map((topic, index) => (
          <AccordionDetails key={index}>
            <Topics data={topic} number={index + 1} />
          </AccordionDetails>
        ))}
      </Accordion>
    </div>
  );
};

export default Chapters;
