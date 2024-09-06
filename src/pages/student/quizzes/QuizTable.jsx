import {
  Box,
  Button,
  Fade,
  Grid,
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
import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const columns = [
  { label: "No", width: 40 },
  { label: "Teacher", width: 100 },
  { label: "Quiz", width: 100 },
  { label: "Time", width: 100 },
  { label: "Quiz Status", width: 100 },
  { label: "Note", width: 100 },
  { label: "Action", width: 100 },
];

const QuizTable = () => {
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState(false);
  const [token, setToken] = useState(false);
  const [confirmToken, setConfirmToken] = useState("");

  const confirmHanlder = (token) => {
    setToken(token);
    setConfirm(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(token);
    navigate("/student/exam/quizname");
  };

  return (
    <Paper>
      <TableContainer sx={{ height: { xs: 500, md: 586 }, overflow: "auto" }}>
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
            <TableRow>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => confirmHanlder("TOKEN")}
                >
                  Join
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        closeAfterTransition
      >
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
                Submit
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Paper>
  );
};

export default QuizTable;
