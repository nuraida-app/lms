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
import { useEffect, useState } from "react";
import { useGetGradesQuery } from "../../../state-control/api/gradeApi";
import { useUpdateClassMutation } from "../../../state-control/api/classApi";
import { toast } from "react-toastify";

const ClassEdit = ({ open, close, data }) => {
  const { data: grades } = useGetGradesQuery();
  const [updateClass, { data: message, isLoading, isSuccess, error, reset }] =
    useUpdateClassMutation();

  const [gradeId, setGradeId] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const updateHandler = (e) => {
    e.preventDefault();

    const dataUpdate = {
      gradeId,
      code,
      name,
    };

    updateClass({ id: data?.id, body: dataUpdate });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      close();
      reset();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, message, error]);

  useEffect(() => {
    if (data) {
      setGradeId(data?.grade_id);
      setCode(data?.code);
      setName(data?.name);
    }
  }, [data]);
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
          <form className="form-class" onSubmit={updateHandler}>
            <FormControl>
              <InputLabel>--Grade--</InputLabel>
              <Select
                required
                label="--Grade--"
                value={gradeId || ""}
                onChange={(e) => setGradeId(e.target.value)}
              >
                {grades?.map((grade) => (
                  <MenuItem key={grade.id} value={grade.id}>
                    {grade.grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Code"
              placeholder="Code"
              value={code || ""}
              onChange={(e) => setCode(e.target.value)}
            />

            <TextField
              fullWidth
              label="Name"
              placeholder="Name"
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
                cancel
              </Button>
              <Button variant="contained" color="success" type="submit">
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "add"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ClassEdit;
