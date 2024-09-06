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
import { useGetGradesQuery } from "../../../state-control/api/gradeApi";
import { useEffect, useState } from "react";
import { useCreateClassMutation } from "../../../state-control/api/classApi";
import { toast } from "react-toastify";

const ClassAdd = ({ open, close }) => {
  const { data: grades } = useGetGradesQuery();
  const [createClass, { data, isSuccess, isLoading, error, reset }] =
    useCreateClassMutation();

  const [gradeId, setGradeId] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const addHandler = (e) => {
    e.preventDefault();

    const data = { gradeId, code, name };

    createClass(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);

      setGradeId("");
      setCode("");
      setName("");
      reset();
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
          <form className="form-class" onSubmit={addHandler}>
            <FormControl>
              <InputLabel>--Grade--</InputLabel>
              <Select
                required
                label="--Grade--"
                value={gradeId}
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
              label="Class code"
              placeholder="Must be NUMBER"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <TextField
              fullWidth
              label="Class"
              placeholder="Class"
              value={name}
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

export default ClassAdd;
