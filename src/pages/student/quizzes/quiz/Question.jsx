import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCreateAnswerMutation,
  useDoubtAnswerMutation,
} from "../../../../state-control/api/answerApi";
import { toast } from "react-toastify";
import Editor from "../../../admin/quizzes/questions/Editor";

const createMarkup = (html) => {
  return { __html: html };
};

const Question = ({ setOpen, question, note, number, refresh, answers }) => {
  const params = useParams();
  const start = params.start;
  const end = params.end;
  const [timeLeft, setTimeLeft] = useState(null);
  const [shuffledChoices, setShuffledChoices] = useState([]);

  // Shuffle
  useEffect(() => {
    if (note?.shuffle) {
      const shuffled = [...(question?.choices || [])].sort(
        () => Math.random() - 0.5
      );
      setShuffledChoices(shuffled);
    } else {
      setShuffledChoices(question?.choices || []);
    }
  }, [note, question]);

  // Countdown
  useEffect(() => {
    const endTime = new Date(end).getTime();

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        clearInterval(countdown);

        localStorage.removeItem("questions");

        window.location.href = `${import.meta.env.VITE_DOMAIN}/student/exam`;
      } else {
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(
          `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
          }:${seconds < 10 ? "0" + seconds : seconds}`
        );
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [start, end]);

  // Choice and answer
  const [value, setValue] = useState("");
  const [createAnswer, { data, isSuccess, error, reset }] =
    useCreateAnswerMutation();
  const [doubtAnswer, { data: message, isSuccess: dSuccess, error: dError }] =
    useDoubtAnswerMutation();
  const currentAnswer = answers?.find(
    (answer) => answer.question_id === question?.id
  );

  const choiceHandler = (e) => {
    const data = {
      quizId: question?.quiz_id,
      questionId: question?.id,
      type: question?.type,
      mc: e.target.value,
      poin: question?.score,
    };

    createAnswer(data);
  };

  const essayHandler = (e) => {
    e.preventDefault();

    const data = {
      quizId: question?.quiz_id,
      questionId: question?.id,
      type: question?.type,
      essay: value,
    };

    createAnswer(data);
  };

  const doubtHandler = () => {
    const data = {
      quizId: question?.quiz_id,
      questionId: question?.id,
    };

    doubtAnswer(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (dSuccess) {
      toast.info(message.message);
    }

    if (dError) {
      toast.error(dError.data.message);
    }
  }, [message, dSuccess, dError]);

  // Synchronize
  const handleSync = () => {
    localStorage.removeItem("questions");

    refresh();
  };

  return (
    <Fragment>
      <Paper
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {number}
        </Button>

        <Button
          variant="contained"
          color="error"
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={() => setOpen(true)}
        >
          {number}
        </Button>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" color="error">
            {timeLeft}
          </Button>
          <IconButton color="error" onClick={handleSync}>
            <SyncIcon />
          </IconButton>
        </Box>
      </Paper>
      <Grid
        container
        sx={{
          height: { xs: "75vh", md: "67vh" },
          mb: 1,
          p: 1,
          bgcolor: "white",
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Grid item xs={12} md={8}>
          <Box sx={{ height: { xs: 300, md: 410 }, p: 1, overflow: "auto" }}>
            <Box
              sx={{ minHeight: "100%" }}
              dangerouslySetInnerHTML={createMarkup(question?.question)}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: { xs: 250, md: 410, lg: 450, xl: 480 },
              overflow: "auto",
              p: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {question?.type === 1 && (
              <FormControl sx={{ ml: 1 }}>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={currentAnswer?.mc || ""}
                  onChange={choiceHandler}
                >
                  {shuffledChoices
                    .filter((item) => item.text !== null)
                    .map((item, index) => (
                      <FormControlLabel
                        key={index}
                        control={<Radio />}
                        value={item.value}
                        label={
                          <Typography
                            dangerouslySetInnerHTML={createMarkup(item.text)}
                          />
                        }
                      />
                    ))}
                </RadioGroup>
              </FormControl>
            )}

            {question?.type === 2 && (
              <form onSubmit={essayHandler}>
                <Editor
                  placeholder="Write your answer here"
                  value={currentAnswer?.essay || value}
                  onChange={(html) => setValue(html)}
                />

                <Button
                  fullWidth
                  variant={currentAnswer?.essay ? "contained" : "outlined"}
                  color="success"
                  type="submit"
                  sx={{ mt: 1 }}
                >
                  Save
                </Button>
              </form>
            )}
            <Button
              variant={currentAnswer?.doubt ? "contained" : "outlined"}
              color="warning"
              onClick={doubtHandler}
            >
              doubt
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Question;
