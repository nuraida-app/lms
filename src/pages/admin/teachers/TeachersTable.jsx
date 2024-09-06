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
import { Fragment, useEffect, useState } from "react";
import TeachersFunc from "./TeachersFunc";
import {
  useDeleteTeacherMutation,
  useGetTeacherMutation,
  useGetTeachersQuery,
} from "../../../state-control/api/teacherApi";
import TeacherEdit from "./TeacherEdit";
import { toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";

const colums = [
  { label: "No", width: 60 },
  { label: "Homebase", width: 90 },
  { label: "NIP", width: 90 },
  { label: "Name", width: 170 },
  { label: "Subjects", width: 170 },
  { label: "Homeroom", width: 50 },
  { label: "Class", width: 50 },
  { label: "Actions", width: 50 },
];

const TeachersTable = () => {
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
    <Fragment>
      <Box
        sx={{
          p: 1,
          mb: 1,
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
          placeholder="Search Subject"
          value={searchTerm}
          onChange={serachFunction}
        />

        <TeachersFunc />
      </Box>
      {isLoading ? (
        <Skeleton variant="rounded" height={530} />
      ) : (
        <Paper sx={{ width: "100%", overflowX: "auto" }}>
          <TableContainer
            sx={{ height: { xs: 500, md: 530, xl: 638 }, overflow: "auto" }}
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
      )}
      <TeacherEdit open={edit} close={() => setEdit(false)} teacher={teacher} />
    </Fragment>
  );
};

export default TeachersTable;
