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
import RemoveIcon from "@mui/icons-material/Remove";
import React, { Fragment, useEffect, useState } from "react";
import ClassStudentFunc from "./ClassStudentFunc";
import { useParams } from "react-router-dom";
import {
  useGetStudentsByClassQuery,
  useRemoveStudentFromClassMutation,
} from "../../../state-control/api/studentApi";
import { toast } from "react-toastify";

const columns = [
  { label: "No", width: 40 },
  { label: "NIS", width: 100 },
  { label: "Nama", width: 170 },
  { label: "Tingkat", width: 40 },
  { label: "Kelas", width: 40 },
  { label: "Aksi", width: 100 },
];

const ClassStudentsTable = () => {
  const params = useParams();
  const code = params.code;

  const { data: students } = useGetStudentsByClassQuery(code, { skip: !code });
  const [
    removeStudentFromClass,
    { data: message, isSuccess, isLoading, error },
  ] = useRemoveStudentFromClassMutation();

  const deleteHandler = (id) => {
    const data = { code };

    removeStudentFromClass({ id: id, body: data });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [message, isSuccess, error]);

  // search function
  const [searchTerm, setSearchTerm] = useState("");
  const filtering = (user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filtered = students?.filter(filtering);

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
          placeholder="Cari Siswa"
          value={searchTerm}
          onChange={searchFunction}
        />

        <ClassStudentFunc />
      </Box>

      <Paper>
        <TableContainer
          sx={{ height: { xs: 500, md: 530, xl: 630 }, overflow: "auto" }}
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
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{student.nis}</TableCell>
                  <TableCell align="left">{student.name}</TableCell>
                  <TableCell align="center">{student.grade}</TableCell>
                  <TableCell align="center">{student.class}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => deleteHandler(student.id)}
                    >
                      {isLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <RemoveIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Fragment>
  );
};

export default ClassStudentsTable;
