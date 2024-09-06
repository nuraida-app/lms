import {
  CircularProgress,
  IconButton,
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteClassMutation,
  useGetClassesQuery,
  useGetClassMutation,
} from "../../../state-control/api/classApi";
import { toast } from "react-toastify";
import ClassEdit from "./ClassEdit";

const colums = [
  { label: "No", width: 40 },
  { label: "Homebase", width: 100 },
  { label: "Grade", width: 100 },
  { label: "Code", width: 40 },
  { label: "Class", width: 100 },
  { label: "Students", width: 50 },
  { label: "Actions", width: 50 },
];

const ClassTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [code, setCode] = useState("");
  const [gradeId, setGradeId] = useState("");

  const [classId, setClassId] = useState("");
  const [edit, setEdit] = useState(false);

  const handleClick = (event, id, gradeId, code) => {
    setAnchorEl(event.currentTarget);
    setClassId(id);
    setCode(code);
    setGradeId(gradeId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const { data, isLoading } = useGetClassesQuery();
  const [getClass, { data: detailClass, isLoading: detailLoading }] =
    useGetClassMutation();
  const [
    deleteClass,
    { data: message, isLoading: delLoading, isSuccess, error, reset },
  ] = useDeleteClassMutation();

  const addStudents = () =>
    navigate(`/admin/classes/grade/${gradeId}/class-code/${code}/add-students`);

  const detailHandler = () => {
    if (classId) {
      getClass(classId);
      setEdit(true);
      handleClose();
    }
  };

  const deleteHandler = () => {
    if (classId) {
      deleteClass(classId);
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
  }, [isSuccess, message, error]);

  return (
    <Paper>
      <TableContainer
        sx={{ height: { xs: 500, md: 530, xl: 630 }, overflow: "auto" }}
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
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{item.homebase}</TableCell>
                <TableCell align="center">{item.grade}</TableCell>
                <TableCell align="center">{item.code}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.students}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={(e) =>
                      handleClick(e, item.id, item.grade_id, item.code)
                    }
                  >
                    {delLoading ? (
                      <CircularProgress size={14} />
                    ) : (
                      <MoreHorizIcon />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={addStudents}>Add Students</MenuItem>
          <MenuItem onClick={detailHandler}>Edit</MenuItem>
          <MenuItem onClick={deleteHandler}>Delete</MenuItem>
        </Menu>

        <ClassEdit
          open={edit}
          close={() => setEdit(false)}
          data={detailClass}
        />
      </TableContainer>
    </Paper>
  );
};

export default ClassTable;
