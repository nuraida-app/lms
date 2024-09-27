import {
  Box,
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
import React, { Fragment, useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StudentEdit from "./StudentEdit";
import {
  useDeleteStudentMutation,
  useGetStudentMutation,
} from "../../../state-control/api/studentApi";
import { toast } from "react-toastify";

const columns = [
  { label: "No", width: 40 },
  { label: "NIS", width: 100 },
  { label: "Name", width: 170 },
  { label: "Actions", width: 100 },
];

const StudentTable = ({ students, loading }) => {
  const [deleteStudent, { data, isLoading, isSuccess, error }] =
    useDeleteStudentMutation();
  const [getStudent, { data: student }] = useGetStudentMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false);
  const [studentId, setStudentId] = useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setStudentId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = () => {
    if (studentId) {
      handleClose();
      deleteStudent(studentId);
    }
  };

  const editHandler = () => {
    if (studentId) {
      setEdit(true);
      getStudent(studentId);
      handleClose();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [data, isSuccess, error]);

  // search function
  const [searchTerm, setSearchTerm] = useState("");
  const filtering = (user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filtered = students?.filter(filtering);

  const serachFunction = (e) => {
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
          gap: 1,
        }}
      >
        <Input
          placeholder="Search student"
          value={searchTerm}
          onChange={serachFunction}
        />

        {/* <StudentFunc /> */}
      </Box>

      {loading ? (
        <Box
          sx={{
            height: "85vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          sx={{ height: { xs: 500, md: 530, lg: 630 }, overflow: "auto" }}
        >
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
              {filtered?.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{student.nis}</TableCell>
                  <TableCell align="left">{student.name}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => handleClick(e, student.id)}
                    >
                      {isLoading ? (
                        <CircularProgress size={20} color="inherit" />
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
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={editHandler}>Edit</MenuItem>
        <MenuItem onClick={deleteHandler}>Delete</MenuItem>
      </Menu>

      <StudentEdit open={edit} close={() => setEdit(false)} student={student} />
    </Fragment>
  );
};

export default StudentTable;
