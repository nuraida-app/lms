import {
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useGetTeachersQuery } from "../../../state-control/api/teacherApi";
import { useGetGradesQuery } from "../../../state-control/api/gradeApi";
import { useGetQuizesQuery } from "../../../state-control/api/quizApi";
import {
  useGetScheduleQuery,
  useUpdateScheduleMutation,
} from "../../../state-control/api/scheduleApi";
import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { toast } from "react-toastify";
import "./styles.css";
import { useSelector } from "react-redux";

dayjs.extend(utc);
dayjs.extend(timezone);

const ScheduleEdit = ({ open, close, id }) => {
  const { data: grades } = useGetGradesQuery();
  const { data: quizzes } = useGetQuizesQuery();
  const { data: schedule } = useGetScheduleQuery(id, { skip: !id });
  const [
    updateSchedule,
    { data: message, isLoading, error, isSuccess, reset },
  ] = useUpdateScheduleMutation();

  const [teacherId, setTeacherId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [quizId, setQuizId] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const qiuzFilter = quizzes?.filter((quiz) => quiz.teacher_id === teacherId);

  const handleStart = (date) => {
    const localTime = dayjs(date).tz("Asia/Jakarta");

    setStart(localTime);
  };

  const handleEnd = (date) => {
    const localTime = dayjs(date).tz("Asia/Jakarta");

    setEnd(localTime);
  };

  const updateHandler = (e) => {
    e.preventDefault();

    const data = {
      teacherId,
      gradeId,
      quizId,
      name,
      desc,
      start,
      end,
    };

    updateSchedule({ id, body: data });
  };

  useEffect(() => {
    if (schedule) {
      setTeacherId(schedule.teacher_id);
      setGradeId(schedule.grade_id);
      setQuizId(schedule.quiz_id);
      setName(schedule.schedule);
      setDesc(schedule.description);
      setStart(dayjs(schedule.start).tz("Asia/Jakarta"));
      setEnd(dayjs(schedule.end).tz("Asia/Jakarta"));
    }
  }, [schedule]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      close();
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [message, isSuccess, error]);

  return (
    <Modal open={open} onClose={close} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 400 },
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            borderRadius: "5px",
          }}
        >
          <form className="form-schedule" onSubmit={updateHandler}>
            <FormControl fullWidth>
              <InputLabel>--Grade--</InputLabel>
              <Select
                value={gradeId}
                onChange={(e) => setGradeId(e.target.value)}
                required
                label="--Grade--"
              >
                {grades?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>--Quiz--</InputLabel>
              <Select
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                required
                label="--Grade--"
              >
                {qiuzFilter?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.quiz_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              required
              placeholder="Schedule"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              fullWidth
              required
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Start"
                  value={start}
                  onChange={handleStart}
                />
              </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker label="End" value={end} onChange={handleEnd} />
              </DemoContainer>
            </LocalizationProvider>

            <Box sx={{ display: "flex", justifyContent: "end", gap: 1 }}>
              <Button variant="contained" color="error" onClick={close}>
                cancel
              </Button>
              <Button variant="contained" color="success" type="submit">
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "update"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ScheduleEdit;
