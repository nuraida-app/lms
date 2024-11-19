import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Input,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useGiveScoreMutation } from "../../../../state-control/api/answerApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const createMarkup = (html) => {
  return { __html: html };
};

const columns = [
  { label: "No", width: 30 },
  { label: "NIS", width: 80 },
  { label: "Nama", width: 200 },
  { label: "Kelas", width: 30 },
  { label: "Nilai", width: 30 },
  { label: "Koreksi Jawaban", width: 30 },
];

const DetailEssay = ({ data, questions }) => {
  const params = useParams();
  const quizId = params.quizId;
  const gradeId = params.gradeId;

  const [giveScore, { data: message, isSuccess, isLoading, error }] =
    useGiveScoreMutation();
  const [nis, setNis] = useState("");
  const [selectedClass, setClass] = useState("");
  const [check, setCheck] = useState(false);
  const [poinValue, setPoin] = useState({});

  const qEssay = questions?.filter((q) => q.type === 2);
  const student = data?.find((item) => item.nis === nis);
  const classes = [...new Set(data?.map((item) => item.class))];

  const filtering = (classname) => {
    return classname.class
      .toLowerCase()
      .includes(selectedClass.toLocaleLowerCase());
  };

  const filtered = data?.filter(filtering);

  const answer = student?.answers
    ?.filter((a) => a.essay !== null)
    ?.map((a) => ({
      nis: student.nis,
      questionId: a.questionId,
      essay: a.essay,
      poin: a.poin,
    }));

  const checkHandler = (nis) => {
    setNis(nis);
    setCheck(true);
  };

  const poinHandler = (id, poin) => {
    setPoin((prevState) => ({
      ...prevState,
      [id]: poin,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = Object.entries(poinValue).map(([id, poin]) => ({
      questionId: id,
      poin: parseInt(poin),
    }));

    await Promise.all(
      data.map(({ questionId, poin }) => {
        giveScore({
          id: questionId,
          body: { poin, nis: student.nis, gradeId, quizId },
        });
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      setCheck(false);
      setPoin({});
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [message, isSuccess, error]);

  return (
    <Fragment>
      <Paper sx={{ p: 1, display: "flex", gap: 1, justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setClass("")}
        >
          All
        </Button>
        {classes?.map((item) => (
          <Button
            key={item}
            variant="contained"
            color="primary"
            onClick={() => setClass(item)}
          >
            {item}
          </Button>
        ))}
      </Paper>

      <Paper sx={{ overflow: "auto" }}>
        <TableContainer sx={{ maxHeight: { md: 530, lg: 550, xl: 630 } }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((item, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ width: item.width }}
                  >
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{item.nis}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{item.class}</TableCell>
                  <TableCell align="center">{item.essayPoin}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => checkHandler(item.nis)}
                    >
                      koreksi
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal open={check} onClose={() => setCheck(false)} closeAfterTransition>
        <Fade in={check}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 350, md: 600 },
              maxHeight: 600,
              overflow: "auto",
              bgcolor: "#ffff",
              boxShadow: 24,
              p: 1,
              borderRadius: "5px",
            }}
          >
            <form onSubmit={submitHandler}>
              <Table>
                <TableHead>
                  <TableRow>
                    {["Question", "Answer", "Score"].map((item) => (
                      <TableCell key={item}>{item}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {qEssay?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <div
                          dangerouslySetInnerHTML={createMarkup(item.question)}
                        />
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            answer?.find((a) => a.questionId === item.id)?.essay
                          )}
                        />
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <Input
                          value={
                            poinValue[item.id] !== undefined
                              ? poinValue[item.id]
                              : answer?.find((a) => a.questionId === item.id)
                                  ?.poin !== undefined
                              ? answer?.find((a) => a.questionId === item.id)
                                  ?.poin
                              : 0
                          }
                          onChange={(e) => poinHandler(item.id, e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button
                fullWidth
                variant="contained"
                color="success"
                type="submit"
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={() => setCheck(false)}
                sx={{ mt: 1 }}
              >
                close
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default DetailEssay;
