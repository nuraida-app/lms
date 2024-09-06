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
import { useEffect, useState } from "react";
import "./styles.css";
import { useGetSubjectsQuery } from "../../../state-control/api/subjectApi";
import { useCreateTeacherMutation } from "../../../state-control/api/teacherApi";
import { toast } from "react-toastify";

const TeacherAdd = ({ open, close }) => {
  const { data: subjects } = useGetSubjectsQuery();
  const [createTeacher, { data, isLoading, isSuccess, error, reset }] =
    useCreateTeacherMutation();

  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [subjectIds, setSubjectIds] = useState([]);

  const addHandler = (e) => {
    e.preventDefault();

    const data = {
      nip,
      name,
      subjectIds,
    };

    createTeacher(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setName("");
      setNip("");
      setSubjectIds([]);
      close();
      reset();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, data, error]);

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
          <form className="form-teacher" onSubmit={addHandler}>
            <TextField
              fullWidth
              type="text"
              label="NIP"
              placeholder="NIP"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
            />

            <TextField
              fullWidth
              label="Full Name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <FormControl>
              <InputLabel>--Subjects--</InputLabel>
              <Select
                required
                label="--Subjects--"
                multiple
                value={subjectIds}
                onChange={(e) => setSubjectIds(e.target.value)}
              >
                {subjects?.map((item, index) => (
                  <MenuItem key={index} value={item.code}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
                  "Add"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TeacherAdd;
