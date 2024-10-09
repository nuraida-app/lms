import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  TextField,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  useAddTopicMutation,
  useGetTopicQuery,
} from "../../../state-control/api/lmsApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Topic = ({ open, close, id, chapter_id }) => {
  const params = useParams();

  const [addTopic, { data, isSuccess, isLoading, error, reset }] =
    useAddTopicMutation();
  const { data: topic } = useGetTopicQuery(id, { skip: !id });

  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");

  const addHandler = (e) => {
    e.preventDefault();

    const data = {
      id: id ? id : null,
      chapter_id,
      title,
      goal,
      subject_code: params.code,
    };

    addTopic(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      setTitle("");
      setGoal("");
      close();
      window.location.reload();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (topic) {
      setTitle(topic.title);
      setGoal(topic.goal);
    }
  }, [topic]);

  return (
    <Modal open={open} onClose={close} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 400 },
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            borderRadius: "5px",
          }}
        >
          <form onSubmit={addHandler}>
            <TextField
              fullWidth
              label="Title"
              placeholder="Topic's title"
              InputLabelProps={{ shrink: true }}
              sx={{ my: 1 }}
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Learning Prurpose"
              placeholder="Learning Prurpose"
              InputLabelProps={{ shrink: true }}
              sx={{ my: 1 }}
              value={goal || ""}
              onChange={(e) => setGoal(e.target.value)}
            />

            <Box align="end">
              <Button
                startIcon={<CloseOutlinedIcon />}
                variant="contained"
                color="error"
                onClick={close}
                sx={{ mr: 1 }}
              >
                cancel
              </Button>

              <Button
                startIcon={<AddOutlinedIcon />}
                variant="contained"
                color="success"
                type="submit"
              >
                {isLoading ? <CircularProgress size={24} /> : "Add"}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Topic;
