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
  useAddChapterMutation,
  useGetChapterQuery,
} from "../../../state-control/api/lmsApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Chapter = ({ open, close, id }) => {
  const params = useParams();
  const code = params.code;

  const [addChapter, { data, isSuccess, isLoading, error, reset }] =
    useAddChapterMutation();
  const { data: chapter } = useGetChapterQuery(id, { skip: !id });

  const [title, setTitle] = useState("");

  const addHandler = (e) => {
    e.preventDefault();

    const data = { id: id ? id : null, code, title };

    addChapter(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      setTitle("");
      close();
      window.location.reload();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (chapter) {
      setTitle(chapter.title);
    }
  }, [chapter]);
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
              placeholder="Chapter's title"
              InputLabelProps={{ shrink: true }}
              sx={{ my: 1 }}
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
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

export default Chapter;
