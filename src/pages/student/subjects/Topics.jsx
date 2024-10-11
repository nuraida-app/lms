import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Fade,
  ListItemText,
  Modal,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useGetFilesQuery } from "../../../state-control/api/lmsApi";
import ReactPlayer from "react-player/youtube";

const Topics = ({ data, number }) => {
  const { data: files } = useGetFilesQuery(data.id, { skip: !data.id });

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const download = (link, type) => {
    if (type !== "youtube") {
      window.open(link, "_blank");
    } else {
      setOpen(true);
      setUrl(link);
    }
  };

  return (
    <>
      <Accordion sx={{ ml: 8 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ListItemText
            primary={`Topic ${number}: ${data.title}`}
            secondary={data.goal}
          />
        </AccordionSummary>

        {files?.map((file, index) => (
          <AccordionDetails key={index}>
            <Button
              size="small"
              startIcon={
                file.type_file === "pdf" ? (
                  <PictureAsPdfOutlinedIcon />
                ) : file.type_file === "doc" ? (
                  <ArticleOutlinedIcon />
                ) : (
                  <YouTubeIcon />
                )
              }
              variant="contained"
              color={
                file.type_file === "pdf"
                  ? "warning"
                  : file.type_file === "doc"
                  ? "primary"
                  : "error"
              }
              onClick={() => download(file.link_file, file.type_file)}
            >
              {file.title}
            </Button>
          </AccordionDetails>
        ))}
      </Accordion>

      <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <ReactPlayer width="740px" height="460px" url={url} controls />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Topics;
