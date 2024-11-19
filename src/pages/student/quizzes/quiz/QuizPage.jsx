import { Box, Button, Grid, Modal, Paper, Fade } from "@mui/material";
import Head from "./Head";
import "../styles.css";
import Question from "./Question";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetQuestionsQuery } from "../../../../state-control/api/questionApi";
import { useSelector } from "react-redux";
import { useGetMyAnswersQuery } from "../../../../state-control/api/answerApi";
import { useFinishedQuizMutation } from "../../../../state-control/api/logApi";
import { toast } from "react-toastify";

const QuizPage = () => {
  const params = useParams();
  const quizId = params.quizId;
  const quizname = params.quizname.replace(/-/g, " ");

  const { data, refetch } = useGetQuestionsQuery(quizId, { skip: !quizId });
  const { data: answers } = useGetMyAnswersQuery(quizId, { skip: !quizId });
  const { user } = useSelector((state) => state.authentication);
  const [finishedQuiz, { data: message, isSuccess, isLoading, error }] =
    useFinishedQuizMutation();

  const [open, setOpen] = useState(false);

  // State untuk menyimpan soal
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(1);

  // Mengambil pertanyaan dari API atau localStorage
  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");

    // If stored questions exist, set them in the state without fetching from API
    if (storedQuestions) {
      const parsedQuestions = JSON.parse(storedQuestions);
      if (Array.isArray(parsedQuestions.questions)) {
        setQuestions(parsedQuestions.questions);
      } else {
        setQuestions([]); // If the format isn't as expected, set an empty array
      }
    } else {
      // Only fetch questions if they don't exist in localStorage
      if (data && Array.isArray(data.questions)) {
        localStorage.setItem("questions", JSON.stringify(data));
        setQuestions(data.questions);
      }
    }
  }, [data]); // Dependencies include `data`, which will update when new data is fetched

  // Fungsi untuk mendapatkan kembali soal dari API setelah localStorage dihapus
  const refreshQuestions = () => {
    refetch(); // Mengambil ulang data soal dari API

    if (data && Array.isArray(data.questions)) {
      localStorage.setItem("questions", JSON.stringify(data));
      setQuestions(data.questions);
    }
  };

  // Menentukan pertanyaan yang sedang ditampilkan
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions?.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Fungsi untuk mengubah halaman
  const handlePageChange = (event, page) => {
    if (page >= 1 && page <= Math.ceil(questions.length / questionsPerPage)) {
      setCurrentPage(page); // Set current page yang baru
    }
  };

  // finsh
  const finishHandler = () => {
    finishedQuiz(quizId);
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = `${import.meta.env.VITE_DOMAIN}/student/exam`;
      localStorage.removeItem("questions");
    }

    if (error) {
      toast.error(error.message || error.data.message);
    }
  }, [message, isSuccess, error]);

  return (
    <Box sx={{ bgcolor: "#EDF3F9", height: "100vh" }}>
      <Head user={user} quiz={quizname} />

      <Grid container>
        <Grid
          item
          xs={12}
          md={10}
          sx={{ p: 1, height: "calc(100vh - 70px)", overflow: "auto" }}
        >
          {currentQuestions?.map((question, index) => (
            <Question
              key={index}
              setOpen={setOpen}
              question={question}
              answers={answers}
              note={data?.note}
              number={currentPage}
              refresh={refreshQuestions}
            />
          ))}

          <Paper
            sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
          >
            <Button
              startIcon={<ChevronLeftIcon />}
              variant="contained"
              color="primary"
              onClick={() => handlePageChange(null, currentPage - 1)}
              disabled={currentPage === 1}
            >
              Sebelumnya
            </Button>

            {currentPage !== Math.ceil(questions.length / questionsPerPage) ? (
              <Button
                endIcon={<ChevronRightIcon />}
                variant="contained"
                color="primary"
                onClick={() => handlePageChange(null, currentPage + 1)}
              >
                selanjutnya
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={finishHandler}
              >
                Selesai
              </Button>
            )}
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          md={2}
          sx={{
            p: 1,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              height: "70vh",
              overflow: "auto",
            }}
          >
            {/* NUMBER */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {questions.map((item, index) => {
                const currentAnswer = answers?.find(
                  (a) => a.question_id === item.id
                );

                return (
                  <Button
                    variant="contained"
                    color={
                      currentAnswer?.doubt
                        ? "warning"
                        : currentAnswer
                        ? "success"
                        : "primary"
                    }
                    key={item.id}
                    onClick={() => handlePageChange(null, index + 1)}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* NUMBER */}
      <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 350,
              maxHeight: 600,
              bgcolor: "#ffff",
              boxShadow: 24,
              p: 2,
              borderRadius: "5px",
              overflow: "auto",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {questions.map((item, index) => {
                const currentAnswer = answers?.find(
                  (a) => a.question_id === item.id
                );

                return (
                  <Button
                    variant="contained"
                    color={
                      currentAnswer?.doubt
                        ? "warning"
                        : currentAnswer
                        ? "success"
                        : "primary"
                    }
                    key={item.id}
                    onClick={() => {
                      handlePageChange(null, index + 1);
                      setOpen(false);
                    }}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default QuizPage;
