import {
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import "./styles.css";
import { useCreateSubjectMutation } from "../../../state-control/api/subjectApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SubjectAdd = ({ open, close }) => {
  const [createSubject, { data, isLoading, isSuccess, error, reset }] =
    useCreateSubjectMutation();

  const [code, setCode] = useState("");
  const [subject, setSubject] = useState("");

  const addHandler = (e) => {
    e.preventDefault();

    const data = {
      code,
      subject,
    };

    createSubject(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);

      setCode("");
      setSubject("");
      close();
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, error, data]);

  return (
    <Modal open={open} onClose={close}>
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
          {isLoading ? (
            <CircularProgress />
          ) : (
            <form className="form-subject" onSubmit={addHandler}>
              <TextField
                fullWidth
                label="Code"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <TextField
                fullWidth
                label="Subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="outlined" color="error" onClick={close}>
                  cancel
                </Button>
                <Button variant="contained" color="success" type="submit">
                  add
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default SubjectAdd;
