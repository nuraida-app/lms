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
import { useGetTeachersQuery } from "../../../state-control/api/teacherApi";
import { useGetGradesQuery } from "../../../state-control/api/gradeApi";
import { useEffect, useState } from "react";
import { useCreateQuizMutation } from "../../../state-control/api/quizApi";
import { toast } from "react-toastify";

const QuizAdd = ({ open, close }) => {
  const { data: teachers, isLoading: tLoad } = useGetTeachersQuery();
  const { data: grades, isLoading: gLoad } = useGetGradesQuery();
  const [
    createQuiz,
    { data: message, isLoading: qLoad, isSuccess, error, reset },
  ] = useCreateQuizMutation();

  const [teacherId, setTeacherId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [shuffle, setShuffle] = useState(false);
  const [mc, setMc] = useState("");
  const [essay, setEssay] = useState("");
  const [quizName, setQuizName] = useState("");

  const createHandler = (e) => {
    e.preventDefault();

    // Validasi quizName tidak mengandung karakter / atau -
    if (/[/\-]/.test(quizName)) {
      toast.error("Quiz name should not contain '/' or '-'");
      return;
    }

    const data = {
      teacherId,
      gradeId,
      quizName,
      shuffle,
      mc,
      essay,
    };

    createQuiz(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      setTeacherId("");
      setGradeId("");
      setShuffle(false);
      setMc("");
      setEssay("");
      setQuizName("");
      close();
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [message, isSuccess, error]);

  const closeHandler = () => {
    setTeacherId("");
    setShuffle(false);
    setQuizName("");
    setMc("");
    setEssay("");
    setGradeId("");
    close();
  };

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
          <form className="form-quiz" onSubmit={createHandler}>
            <FormControl fullWidth>
              <InputLabel>--Guru--</InputLabel>
              <Select
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                required
                label="--Guru--"
              >
                {teachers?.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>--Tingkat--</InputLabel>
              <Select
                value={gradeId}
                onChange={(e) => setGradeId(e.target.value)}
                required
                label="--Tingkat--"
              >
                {grades?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>--Acak--</InputLabel>
              <Select
                value={shuffle}
                onChange={(e) => setShuffle(e.target.value)}
                required
                label="--Acak--"
              >
                <MenuItem value={true}>ya</MenuItem>
                <MenuItem value={false}>Tidak</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              required
              label="Nama Ujian"
              placeholder="Nama Ujian"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                required
                type="number"
                label="PG"
                placeholder="eg: 80"
                value={mc}
                onChange={(e) => setMc(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                required
                type="number"
                label="Essay"
                placeholder="eg: 20"
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
              }}
            >
              <Button variant="outlined" color="error" onClick={closeHandler}>
                tutup
              </Button>
              <Button variant="contained" color="success" type="submit">
                {tLoad || gLoad || qLoad ? (
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

export default QuizAdd;
