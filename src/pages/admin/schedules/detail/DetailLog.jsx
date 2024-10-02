import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useClearLogAnswersMutation,
  useResetLogMutation,
} from "../../../../state-control/api/logApi";
import { toast } from "react-toastify";

const columns = [
  { label: "No", width: 30 },
  { label: "NIS", width: 100 },
  { label: "Name", width: 150 },
  { label: "Class", width: 30 },
  { label: "Join", width: 110 },
  { label: "IP", width: 110 },
  { label: "Browser", width: 110 },
  { label: "Status", width: 100 },
  { label: "Reset", width: 100 },
];

const DetailLog = ({ data, logs }) => {
  const params = useParams();
  const [resetLog, { data: message, isSuccess, isLoading, error }] =
    useResetLogMutation();
  const [
    clearLogAnswer,
    {
      data: clearMsg,
      isSuccess: isClear,
      error: clearError,
      isLoading: clearLoading,
    },
  ] = useClearLogAnswersMutation();

  const resetHandler = (nis, logId) => {
    const data = {
      nis: parseInt(nis),
      logId: parseInt(logId),
      quizId: parseInt(params.quizId),
    };

    resetLog(data);
  };

  const rejoin = (nis, logId) => {
    const data = {
      nis: parseInt(nis),
      logId: parseInt(logId),
      quizId: parseInt(params.quizId),
    };

    clearLogAnswer(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [message, isSuccess, error]);

  useEffect(() => {
    if (isClear) {
      toast.success(clearMsg.message);
    }

    if (clearError) {
      toast.error(clearError.data.message);
    }
  }, [clearMsg, isClear, clearError]);
  return (
    <Paper sx={{ overflow: "auto" }}>
      <TableContainer
        sx={{ maxHeight: { md: 530, lg: 550, xl: 700 }, width: "100%" }}
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
            {data?.map((student, index) => {
              const log = logs?.find((l) => l.nis === student.nis);
              return (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{student.nis}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell align="center">{student.class}</TableCell>
                  <TableCell align="center">
                    {log
                      ? new Date(log.log_in).toLocaleDateString("id-ID", {
                          hour: "numeric",
                          minute: "numeric",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell align="center">{log ? log.ip : "-"}</TableCell>
                  <TableCell align="center">
                    {log ? log.browser : "-"}
                  </TableCell>
                  <TableCell align="center">
                    {!log ? (
                      <Typography sx={{ color: "orange", fontWeight: "bold" }}>
                        Unjoin
                      </Typography>
                    ) : log?.isDone ? (
                      <Typography sx={{ color: "red", fontWeight: "bold" }}>
                        Finished
                      </Typography>
                    ) : log?.isActive ? (
                      <Typography sx={{ color: "green", fontWeight: "bold" }}>
                        Ongoing
                      </Typography>
                    ) : (
                      <Typography sx={{ color: "orange", fontWeight: "bold" }}>
                        Unjoin
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Reset">
                      <span>
                        <IconButton
                          color="info"
                          onClick={() => resetHandler(student.nis, log?.id)}
                          disabled={!log ? true : log?.isActive ? false : true}
                        >
                          {isLoading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <RestartAltIcon />
                          )}
                        </IconButton>
                      </span>
                    </Tooltip>

                    <Tooltip title="Rejoin">
                      <span>
                        <IconButton
                          color="error"
                          disabled={!log ? true : log.isDone ? false : true}
                          onClick={() => rejoin(student.nis, log?.id)}
                        >
                          {clearLoading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <LockResetIcon />
                          )}
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DetailLog;
