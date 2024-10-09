import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
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
import { useGetClassesQuery } from "../../../state-control/api/classApi";

const Chapter = ({ open, close, id }) => {
  const params = useParams();
  const code = params.code;

  const [addChapter, { data, isSuccess, isLoading, error, reset }] =
    useAddChapterMutation();
  const { data: chapter } = useGetChapterQuery(id, { skip: !id });
  const { data: classes } = useGetClassesQuery();

  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);

  const handleCheckboxChange = (event, classCode) => {
    if (event.target.checked) {
      setSelectedClasses((prev) => [...prev, classCode]);
    } else {
      setSelectedClasses((prev) => prev.filter((id) => id !== classCode));
    }
  };

  const addHandler = (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Please enter chapter title");
      return;
    }

    if (!selectedClasses) {
      toast.error("Please select classes");
      return;
    }

    const data = { id: id ? id : null, code, title, selectedClasses, goal };

    addChapter(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      setTitle("");
      setGoal("");
      setSelectedClasses([]);
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
      setGoal(chapter.goal);
      setSelectedClasses(chapter?.class_code);
    }
  }, [chapter]);

  const closeHandler = () => {
    setTitle("");
    setGoal("");
    setSelectedClasses([]);
    close();
  };
  return (
    <Modal open={open} onClose={closeHandler} closeAfterTransition>
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
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            onSubmit={addHandler}
          >
            <TextField
              fullWidth
              label="Title"
              placeholder="Chapter's title"
              InputLabelProps={{ shrink: true }}
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

            <FormControl component="fieldset">
              <FormGroup row>
                {classes?.map((cls) => (
                  <FormControlLabel
                    key={cls.id}
                    control={
                      <Checkbox
                        checked={selectedClasses?.includes(cls.code)}
                        onChange={(e) => handleCheckboxChange(e, cls.code)}
                      />
                    }
                    label={cls.name}
                  />
                ))}
              </FormGroup>
            </FormControl>

            <Box align="end">
              <Button
                startIcon={<CloseOutlinedIcon />}
                variant="contained"
                color="error"
                onClick={closeHandler}
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
