import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { Fragment, useEffect, useState } from "react";
import QuizzesFunc from "./QuizzesFunc";
import QuizEdit from "./QuizEdit";
import { useNavigate } from "react-router-dom";
import {
  useDeleteQuizMutation,
  useGetQuizesQuery,
  useGetQuizMutation,
} from "../../../state-control/api/quizApi";
import { toast } from "react-toastify";

const columns = [
  { label: "No", width: 50 },
  { label: "Teacher", width: 170 },
  { label: "Bank", width: 170 },
  { label: "Grade", width: 70 },
  { label: "MC", width: 70 },
  { label: "Essay", width: 70 },
  { label: "Questions", width: 70 },
  { label: "Actions", width: 170 },
];

const QuizzesTable = () => {
  const { data } = useGetQuizesQuery();
  const [getQuiz, { data: quiz }] = useGetQuizMutation();
  const [deleteQuiz, { data: message, isLoading, isSuccess, error, reset }] =
    useDeleteQuizMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const addQuestion = (name, id) => {
    const formattedName = name.replace(/\s+/g, "-");
    navigate(`/admin/quizzes/${formattedName}/${id}`);
  };

  const editHandler = () => {
    if (selectedId) {
      setEdit(true);
      getQuiz(selectedId);
      handleClose();
    }
  };

  const deleteHandler = () => {
    if (selectedId) {
      deleteQuiz(selectedId);
      handleClose();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [message, isSuccess, error]);

  // search function
  const [searchTerm, setSearchTerm] = useState("");
  const filtering = (quiz) => {
    return quiz.teacher.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filtered = data?.filter(filtering);

  const searchFunction = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Fragment>
      <Box
        sx={{
          p: 1,
          boxShadow: 2,
          bgcolor: "white",
          borderRadius: 1,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column-reverse", md: "row" },
          gap: 2,
        }}
      >
        <Input
          placeholder="Search Teacher"
          value={searchTerm}
          onChange={searchFunction}
        />

        <QuizzesFunc />
      </Box>

      <Paper>
        <TableContainer>
          <Table>
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
                  <TableCell align="left">{item.teacher}</TableCell>
                  <TableCell align="center">{item.quiz_name}</TableCell>
                  <TableCell align="center">{item.grade}</TableCell>
                  <TableCell align="center">{item.mc}</TableCell>
                  <TableCell align="center">{item.essay}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => addQuestion(item.quiz_name, item.id)}
                    >
                      Add
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      id="basic-button"
                      color="primary"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => handleClick(e, item.id)}
                    >
                      {isLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <MoreHorizIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <QuizEdit open={edit} close={() => setEdit(false)} quiz={quiz} />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => editHandler()}>Edit</MenuItem>
        <MenuItem onClick={deleteHandler}>Delete</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default QuizzesTable;
