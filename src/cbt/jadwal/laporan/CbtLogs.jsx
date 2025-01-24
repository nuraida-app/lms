import React, { Fragment, useState, useEffect } from "react";
import TableContainer from "../../../components/tabel/TabelContainer";
import {
  useGetLogsQuery,
  useClearLogAnswersMutation,
  useResetLogMutation,
} from "../../../control/api/logApi";
import { useParams } from "react-router-dom";
import { useGetClassByGradeQuery } from "../../../control/api/classApi";
import { toast } from "react-toastify";

const columns = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama Siswa" },
  { label: "Kelas" },
  { label: "Login" },
  { label: "Ip Address" },
  { label: "Browser" },
  { label: "Status" },
  { label: "Reset" },
];

const CbtLogs = ({ tableRef }) => {
  const params = useParams();
  const quizId = params.bankid;
  const gradeId = params.gradeid;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [class_code, setClasCode] = useState();

  const { data: rawData = {} } = useGetLogsQuery({
    page,
    limit,
    search,
    class_code,
    quizId,
  });
  const { logs = [], totalPages, total } = rawData;
  const { data: classes } = useGetClassByGradeQuery(gradeId);
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

  const resetHandler = (nis, logId, name) => {
    const data = {
      nis: parseInt(nis),
      logId: parseInt(logId),
      quizId: parseInt(quizId),
    };

    const confirm = window.confirm(`Apa ${name} akan mengulang ujian?`);

    if (confirm) {
      resetLog(data);
    }
  };

  const rejoin = (nis, logId, name) => {
    const data = {
      nis: parseInt(nis),
      logId: parseInt(logId),
      quizId: parseInt(quizId),
    };

    const confirm = window.confirm(
      `Apa anda yakin akan menghapus seluruh jawaban ${name} pada ujian ini?`
    );

    if (confirm) {
      clearLogAnswer(data);
    }
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
    <TableContainer
      page={page}
      setPage={(e) => setPage(e)}
      setLimit={(e) => setLimit(e)}
      onValue={(e) => setSearch(e)}
      totalPages={totalPages}
    >
      <div className="d-flex align-items-center justify-content-between">
        <p className="m-0 h6">
          Jumlah Siswa: <span>{total}</span>
        </p>

        <div className="d-flex align-items-center justify-content-end flex-wrap gap-1">
          <button className="btn btn-secondary" onClick={() => setClasCode("")}>
            Reset
          </button>
          {classes?.map((item) => (
            <button
              key={item.id}
              className="btn btn-secondary"
              onClick={() => setClasCode(item.code)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <table ref={tableRef} className="table table-striped table-hover">
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={i} scope="col" className="text-center">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={log.id}>
              <td className="text-center align-middle">
                {(page - 1) * limit + index + 1}
              </td>
              <td className="text-center align-middle">{log.nis}</td>
              <td className="align-middle">{log.name}</td>
              <td className="text-center align-middle">{log.class_name}</td>
              <td className="text-center align-middle">
                {new Date(log.log_in).toLocaleDateString("id-ID", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </td>
              <td className="text-center align-middle">{log.ip}</td>
              <td className="text-center align-middle">{log.browser}</td>
              <td className="text-center align-middle">
                {log.isDone ? (
                  <p className="m-0 text-danger fw-bold">Selesai</p>
                ) : (
                  <p className="m-0 text-success fw-bold">Mengerjakan</p>
                )}
              </td>

              <td>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-warning"
                    onClick={() => rejoin(log.nis, log.id, log.name)}
                    disabled={log.isDone ? false : true}
                  >
                    Ulang
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => resetHandler(log.nis, log.id, log.name)}
                    disabled={log.isActive ? false : true}
                  >
                    Reset
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default CbtLogs;
