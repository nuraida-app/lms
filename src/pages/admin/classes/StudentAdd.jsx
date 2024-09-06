import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Input,
  Modal,
} from "@mui/material";
import "./styles.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAddStudentToClassMutation } from "../../../state-control/api/studentApi";
import { useParams } from "react-router-dom";

const StudentAdd = ({ open, close }) => {
  const params = useParams();

  const [addStudentToClass, { data, isSuccess, isLoading, error, reset }] =
    useAddStudentToClassMutation();

  const [nis, setNis] = useState("");
  const gradeId = params.gradeId;
  const code = params.code;

  const findStudent = (e) => {
    e.preventDefault();

    const data = { nis, gradeId, code };

    addStudentToClass(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setNis("");
      close();
      reset();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, data, error]);

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
          <form className="form-class" onSubmit={findStudent}>
            <Input
              placeholder="Input NIS"
              value={nis}
              onChange={(e) => setNis(e.target.value)}
              required
            />

            <Button variant="contained" color="primary" type="submit">
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "add"
              )}
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default StudentAdd;
