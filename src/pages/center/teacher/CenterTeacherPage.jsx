import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import Layout from "../components/layout/Layout";
import {
  useDeleteTeacherMutation,
  useGetTeacherMutation,
  useGetTeachersQuery,
} from "../../../state-control/api/teacherApi";

const colums = [
  { label: "No", width: 60 },
  { label: "Satuan", width: 90 },
  { label: "NIP", width: 90 },
  { label: "Nama", width: 170 },
  { label: "Mapel", width: 170 },
  { label: "Walas", width: 50 },
  { label: "Kelas", width: 50 },
  { label: "Aksi", width: 50 },
];

const CenterTeacherPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [teacherId, setTeacherId] = useState("");
  const [edit, setEdit] = useState(false);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setTeacherId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: teachers, isLoading } = useGetTeachersQuery();
  const [deleteTeacher, { data, isLoading: delLoading, error, isSuccess }] =
    useDeleteTeacherMutation();
  const [getTeacher, { data: teacher }] = useGetTeacherMutation();

  const editHandler = () => {
    if (teacherId) {
      handleClose();
      setEdit(true);
      getTeacher(teacherId);
    }
  };

  const deleteHandler = () => {
    if (teacherId) {
      deleteTeacher(teacherId);
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
  }, [isSuccess, data, error]);

  // search function
  const [searchTerm, setSearchTerm] = useState("");
  const filtering = (user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filtered = teachers?.filter(filtering);

  const serachFunction = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Layout>
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <Box
          sx={{
            p: 1,
            mb: 1,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column-reverse", md: "row" },
            gap: 2,
          }}
        >
          <Input
            placeholder="Search Teacher"
            value={searchTerm}
            onChange={serachFunction}
          />
        </Box>

        {isLoading ? (
          <Box
            sx={{
              height: { xs: 500, md: 530, lg: 650, xl: 790 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={50} />
          </Box>
        ) : (
          <TableContainer
            sx={{
              height: { xs: 500, md: 530, lg: 650, xl: 790 },
              overflow: "auto",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {colums.map((item, index) => (
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
                {filtered?.map((teacher, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      {teacher.homebase_name}
                    </TableCell>
                    <TableCell align="center">{teacher.nip}</TableCell>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>
                      {teacher.subjects?.map((subject, index) => (
                        <p key={index}>{subject.subject}</p>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {teacher.homeroom === 1 ? (
                        <IconButton color="success">
                          <CheckIcon />
                        </IconButton>
                      ) : (
                        <IconButton color="error">
                          <RemoveIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {teacher.class ? (
                        <p>{teacher.class}</p>
                      ) : (
                        <IconButton color="error">
                          <RemoveIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => handleClick(e, teacher.id)}
                      >
                        {delLoading ? (
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
      </Paper>
    </Layout>
  );
};

export default CenterTeacherPage;
