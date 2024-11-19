import {
  Box,
  CircularProgress,
  IconButton,
  Input,
  Menu,
  MenuItem,
  LinearProgress,
  linearProgressClasses,
  Paper,
  Stack,
  Tooltip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { Fragment, useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StudentEdit from "./StudentEdit";
import { useGetStudentMutation } from "../../../state-control/api/studentApi";
import { toast } from "react-toastify";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

const columns = [
  { label: "No", width: 40 },
  { label: "NIS", width: 100 },
  { label: "Nama", width: 170 },
  { label: "Satuan", width: 80 },
  { label: "Database", width: 80 },
  { label: "Aksi", width: 100 },
];

const StudentsTable = ({ students, loading }) => {
  const [getStudent, { data: student, isLoading }] = useGetStudentMutation();

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

  const editHandler = () => {
    if (studentId) {
      setEdit(true);
      getStudent(studentId);
      handleClose();
    }
  };

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
      </Box>

      <Paper>
        <TableContainer
          sx={{ height: { xs: 500, md: 530, lg: 700 }, overflow: "auto" }}
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
                  <TableCell align="center">{student.homebase}</TableCell>
                  <TableCell align="center">
                    <Tooltip
                      title={`${student.percentage}%`}
                      placement="top-end"
                    >
                      <Stack sx={{ flexGrow: 1 }}>
                        <BorderLinearProgress
                          variant="determinate"
                          value={Number(student.percentage)} // Ensure percentage is numeric
                        />
                      </Stack>
                    </Tooltip>
                  </TableCell>
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
      </Paper>

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
      </Menu>

      <StudentEdit open={edit} close={() => setEdit(false)} student={student} />
    </Fragment>
  );
};

export default StudentsTable;
