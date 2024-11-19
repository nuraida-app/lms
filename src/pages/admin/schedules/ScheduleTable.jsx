import {
  Box,
  Button,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { blue, red, yellow, orange, green } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Fragment, useEffect, useState } from "react";
import ScheduleFunc from "./ScheduleFunc";
import { useNavigate } from "react-router-dom";
import {
  useDeleteScheduleMutation,
  useGetSchedulesQuery,
  useUpdateStatusMutation,
} from "../../../state-control/api/scheduleApi";
import { toast } from "react-toastify";
import ScheduleDetail from "./ScheduleDetail";
import ScheduleEdit from "./ScheduleEdit";

const columns = [
  { label: "No", width: 30 },
  { label: "Guru", width: 120 },
  { label: "Ujian", width: 120 },
  { label: "bank Soal", width: 120 },
  { label: "Tingkat", width: 30 },
  { label: "Status", width: 80 },
  { label: "Ket", width: 30 },
  { label: "Token", width: 90 },
  { label: "Aksi", width: 90 },
];

const ScheduleTable = () => {
  const { data: schedules } = useGetSchedulesQuery();
  const [updateStatus, { data: message, isSuccess, error, reset }] =
    useUpdateStatusMutation();
  const [deleteSchedule, { data: delMsg, isSuccess: delScc, error: delErr }] =
    useDeleteScheduleMutation();

  const navigate = useNavigate();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [scheduleDetail, setScheduleDetail] = useState(false);
  const [scheduleId, setScheduleId] = useState("");
  const [quizname, setQuizname] = useState("");
  const [quizId, setQuizId] = useState("");
  const [gradeId, setGradeId] = useState("");

  const [edit, setEdit] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, start, end, id, quizname, quiz, grade) => {
    setAnchorEl(event.currentTarget);
    setStart(start);
    setEnd(end);
    setScheduleId(id);
    setQuizname(quizname);
    setQuizId(quiz);
    setGradeId(grade);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateHandler = (id) => {
    updateStatus(id);
  };

  const schedule = () => {
    handleClose();
    setScheduleDetail(true);
  };

  const editHandler = () => {
    setEdit(true);
    handleClose();
  };

  const deleteHandler = () => {
    if (scheduleId) {
      handleClose();
      deleteSchedule(scheduleId);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [message, isSuccess, error]);

  useEffect(() => {
    if (delScc) {
      toast.success(delMsg.message);
    }

    if (delErr) {
      toast.error(delErr.data.message);
    }
  }, [delMsg, delScc, delErr]);

  const detailPage = () => {
    const formattedName = quizname.replace(/\s+/g, "-");
    navigate(`/admin/schedules/${formattedName}/${quizId}/${gradeId}`);
  };
  return (
    <Fragment>
      <Paper
        sx={{ display: "flex", justifyContent: "space-between", p: 1, mb: 1 }}
      >
        <Input placeholder="Search Teacher" />

        <ScheduleFunc />
      </Paper>
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
              {schedules?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="left">{item.teacher}</TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="left">{item.quiz}</TableCell>
                  <TableCell align="center">{item.grade}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={item.status}
                      onChange={() => updateHandler(item.id)}
                      color="success"
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {new Date(item.start) > new Date() ? (
                      <Typography color={orange[600]}>Upcoming</Typography>
                    ) : new Date(item.end) < new Date() ? (
                      <Typography color={red[600]}>Finished</Typography>
                    ) : (
                      <Typography color={green[600]}>Ongoing</Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.token}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) =>
                        handleClick(
                          e,
                          item.start,
                          item.end,
                          item.id,
                          item.quiz,
                          item.quiz_id,
                          item.grade_id
                        )
                      }
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ScheduleEdit open={edit} close={() => setEdit(false)} id={scheduleId} />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={schedule}>Jadwal</MenuItem>
        <MenuItem onClick={detailPage}>Detail</MenuItem>
        <MenuItem onClick={editHandler}>Edit</MenuItem>
        <MenuItem onClick={deleteHandler}>Hapus</MenuItem>
      </Menu>

      <ScheduleDetail
        open={scheduleDetail}
        close={() => setScheduleDetail(false)}
        start={start}
        end={end}
      />
    </Fragment>
  );
};

export default ScheduleTable;
