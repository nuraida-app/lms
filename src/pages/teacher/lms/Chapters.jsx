import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Chapter from "./Chapter";
import {
  useDeleteChapterMutation,
  useGetTopicsQuery,
} from "../../../state-control/api/lmsApi";
import { toast } from "react-toastify";
import Topics from "./Topics";
import Topic from "./Topic";

const Chapters = ({ data, number }) => {
  const [deleteChapter, { data: msg, isSuccess, isLoading, error, reset }] =
    useDeleteChapterMutation();
  const { data: topics } = useGetTopicsQuery(data.id, { skip: !data.id });

  const [edit, setEdit] = useState(false);
  const [topic, setTopic] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [msg, isSuccess, error]);

  return (
    <Paper sx={{ my: 2, p: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ListItemText
          primary={`Bab ${number}: ${data.title}`}
          secondary={data.goal}
          sx={{ width: "75%" }}
        />

        <Box>
          <IconButton color="warning" onClick={() => setEdit(true)}>
            <EditOutlinedIcon />
          </IconButton>

          <IconButton color="error" onClick={() => deleteChapter(data.id)}>
            {isLoading ? <CircularProgress size={24} /> : <CloseOutlinedIcon />}
          </IconButton>
        </Box>
      </Box>

      {topics?.map((item, index) => (
        <Topics key={index} data={item} number={index + 1} />
      ))}

      <Box alignSelf="flex-start" sx={{ mx: 8, mt: 1 }}>
        <Button
          startIcon={<AddOutlinedIcon />}
          variant="contained"
          color="success"
          onClick={() => setTopic(true)}
          size="small"
        >
          Topik
        </Button>
      </Box>

      <Topic open={topic} close={() => setTopic(false)} chapter_id={data.id} />

      <Chapter open={edit} close={() => setEdit(false)} id={data.id} />
    </Paper>
  );
};

export default Chapters;
