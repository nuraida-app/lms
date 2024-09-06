import {
  Backdrop,
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
import { useEffect, useState } from "react";
import { useUpdateStudentMutation } from "../../../state-control/api/studentApi";
import { toast } from "react-toastify";

const StudentEdit = ({ open, close, student }) => {
  const [updateStudent, { data: message, isSuccess, isLoading, error }] =
    useUpdateStudentMutation();

  const [nis, setNis] = useState("");
  const [name, setName] = useState("");

  const updateHandler = (e) => {
    e.preventDefault();

    const data = {
      nis,
      name,
    };

    updateStudent({ id: student.id, body: data });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      close();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, message, error]);

  useEffect(() => {
    if (student) {
      setNis(student.nis);
      setName(student.name);
    }
  }, [student]);
  return (
    <Modal
      open={open}
      onClose={close}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            borderRadius: "5px",
          }}
        >
          <form className="form-class" onSubmit={updateHandler}>
            <TextField
              fullWidth
              label="NIS"
              placeholder="NIS"
              value={nis || ""}
              onChange={(e) => setNis(e.target.value)}
            />

            <TextField
              fullWidth
              label="Full name"
              placeholder="Full name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />

            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
              }}
            >
              <Button variant="outlined" color="error" onClick={close}>
                batal
              </Button>
              <Button variant="contained" color="success" type="submit">
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "update"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default StudentEdit;
