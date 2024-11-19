import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  TextField,
} from "@mui/material";
import "./styles.css";
import { useEffect, useState } from "react";
import { useCreateGradeMutation } from "../../../state-control/api/gradeApi";
import { toast } from "react-toastify";

const GradeAdd = ({ open, close }) => {
  const [createGrade, { data, isSuccess, isLoading, error, reset }] =
    useCreateGradeMutation();

  const [grade, setGrade] = useState("");

  const addHandler = (e) => {
    e.preventDefault();

    const data = { grade };

    createGrade(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);

      setGrade("");

      close();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [data, isSuccess, error]);
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
          <form className="form-grade" onSubmit={addHandler}>
            <TextField
              fullWidth
              label="Tingkat"
              placeholder="Tingkat"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
              }}
            >
              <Button variant="outlined" color="error" onClick={close}>
                Tutup
              </Button>
              <Button variant="contained" color="success" type="submit">
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Tambah"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default GradeAdd;
