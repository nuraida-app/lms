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
import { useSelector } from "react-redux";

const QuizAdd = ({ open, close }) => {
  const { user } = useSelector((state) => state.authentication);
  const { data: grades, isLoading: gLoad } = useGetGradesQuery();
  const [
    createQuiz,
    { data: message, isLoading: qLoad, isSuccess, error, reset },
  ] = useCreateQuizMutation();

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
      teacherId: user?.id,
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
              <InputLabel>--Grade--</InputLabel>
              <Select
                value={gradeId}
                onChange={(e) => setGradeId(e.target.value)}
                required
                label="--Grade--"
              >
                {grades?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>--Shuffle--</InputLabel>
              <Select
                value={shuffle}
                onChange={(e) => setShuffle(e.target.value)}
                required
                label="--Grade--"
              >
                <MenuItem value={true}>yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              required
              label="Quiz Name"
              placeholder="Quiz Name"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                required
                type="number"
                label="MC"
                placeholder="eg: 80"
                value={mc}
                onChange={(e) => setMc(e.target.value)}
              />

              <TextField
                fullWidth
                required
                type="number"
                label="Essay"
                placeholder="eg: 20"
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
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
                cancel
              </Button>
              <Button variant="contained" color="success" type="submit">
                {gLoad || qLoad ? (
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
