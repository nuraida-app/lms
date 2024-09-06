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
import { useGetClassesQuery } from "../../../state-control/api/classApi";
import { useUpdateTeacherMutation } from "../../../state-control/api/teacherApi";
import { toast } from "react-toastify";

const TeacherEdit = ({ open, close, teacher }) => {
  const { data: subjects } = useGetSubjectsQuery();
  const { data: classes } = useGetClassesQuery();
  const [updateTeacher, { data: message, isSuccess, isLoading, error, reset }] =
    useUpdateTeacherMutation();

  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [homeroom, setHomeroom] = useState(2);
  const [classCode, setClassCode] = useState(0);
  const [subjectIds, setSubjectIds] = useState([]);

  const updateHandler = (e) => {
    e.preventDefault();

    const data = {
      nip,
      name,
      homeroom,
      classCode,
      subjectIds,
    };

    updateTeacher({ id: teacher?.id, body: data });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      setNip("");
      setName("");
      setHomeroom("");
      setClassCode("");
      setSubjectIds([]);
      close();
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [message, isSuccess, error]);

  useEffect(() => {
    if (teacher) {
      setNip(teacher?.nip);
      setName(teacher?.name);
      setSubjectIds(teacher?.subject_code);
      setHomeroom(teacher?.homeroom);
      setClassCode(teacher?.class_code);
    }
  }, [teacher]);

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
          <form className="form-teacher" onSubmit={updateHandler}>
            <TextField
              fullWidth
              type="text"
              label="NIP"
              placeholder="NIP"
              value={nip || ""}
              onChange={(e) => setNip(e.target.value)}
            />

            <TextField
              fullWidth
              label="Nama Lengkap"
              placeholder="Nama Lengkap"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />

            <FormControl>
              <InputLabel>--Subjects--</InputLabel>
              <Select
                required
                label="--Subjects--"
                multiple
                value={subjectIds || []}
                onChange={(e) => setSubjectIds(e.target.value)}
              >
                {subjects?.map((item, index) => (
                  <MenuItem key={index} value={item.code}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>--Homeroom--</InputLabel>
              <Select
                label="--Homeroom--"
                value={homeroom}
                onChange={(e) => setHomeroom(e.target.value)}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={2}>No</MenuItem>
              </Select>
            </FormControl>

            {homeroom === 1 && (
              <FormControl>
                <InputLabel>--Class--</InputLabel>
                <Select
                  required
                  label="--Class--"
                  value={classCode || ""}
                  onChange={(e) => setClassCode(e.target.value)}
                >
                  {classes?.map((item) => (
                    <MenuItem key={item.id} value={item.code}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

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
                  "Edit"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TeacherEdit;
