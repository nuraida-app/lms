import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Fade,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import "./styles.css";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateLogMutation } from "../../../state-control/api/logApi";

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-EN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Invalid date string:", dateString);
    return "Invalid date";
  }
};

const Quiz = ({ data, user, log }) => {
  const navigate = useNavigate();
  const [createLog, { data: message, isLoading, isSuccess, error, reset }] =
    useCreateLogMutation();

  const [confirm, setConfirm] = useState(false);
  const [token, setToken] = useState(false);
  const [confirmToken, setConfirmToken] = useState("");
  const [status, setStatus] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [quiz, setQuiz] = useState("");
  const [quizId, setQuizId] = useState("");

  const confirmHanlder = (token, status, start, end, quiz, quizId) => {
    setConfirm(true);
    setToken(token);
    setStatus(status);
    setStart(start);
    setEnd(end);
    setQuiz(quiz);
    setQuizId(quizId);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (confirmToken !== token) {
      return toast.error("Token tidak sama");
    }

    if (!status) {
      return toast.error("Ujian tidak aktif");
    }

    const currentTime = new Date();
    if (currentTime < new Date(start)) {
      return toast.error("Ujian belum dimulai");
    }

    if (currentTime > new Date(end)) {
      return toast.error("Ujian telah selesai");
    }

    if (log && log.isDone && log.quiz_id === quizId) {
      return toast.error("Anda sudah mengikuti ujian ini");
    }

    if (log && log.isActive && log.quiz_id === quizId) {
      return toast.error("Anda sudah mengerjakan ujian ini");
    }

    const data = { quizId, nis: user.nis };

    createLog(data);
  };

  const closeHandler = () => {
    setConfirm(false);
    setConfirmToken("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);

      const formattedName = quiz.replace(/\s+/g, "-");

      navigate(`/student/exam/${formattedName}/${quizId}/${start}/${end}`);

      reset();

      localStorage.removeItem("questions");
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, message, error]);

  return (
    <Fragment>
      <Card
        sx={{
          width: 260,
          bgcolor:
            new Date(data?.start) > new Date()
              ? "#015AFF"
              : new Date(data?.end) < new Date()
              ? "#FF1414"
              : "#37FF21",
          color:
            new Date(data?.start) > new Date()
              ? "#F7F7F7"
              : new Date(data?.end) < new Date()
              ? "#0C0C0C"
              : "#000000",
        }}
      >
        <CardActionArea
          onClick={() =>
            confirmHanlder(
              data?.token,
              data?.status,
              data?.start,
              data?.end,
              data?.quiz,
              data?.quiz_id
            )
          }
        >
          <CardContent>
            <Typography fontSize={16}>{data?.quiz}</Typography>
            <Typography fontSize={12} fontStyle="italic">
              {data?.teacher}
            </Typography>

            <Typography fontSize={12} sx={{ mt: 1 }}>
              Start: {formatDate(data?.start)}
            </Typography>
            <Typography fontSize={12}>End: {formatDate(data?.end)}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Modal open={confirm} onClose={closeHandler} closeAfterTransition>
        <Fade in={confirm}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",

              bgcolor: "#ffff",
              boxShadow: 24,
              p: 2,
              borderRadius: "5px",
            }}
          >
            <form onSubmit={submitHandler} className="form-confirm">
              <Input
                placeholder="TOKEN"
                value={confirmToken}
                onChange={(e) => setConfirmToken(e.target.value)}
              />

              <Button type="submit" variant="contained" color="error">
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "submit"
                )}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default Quiz;
