import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSchedulesByGradeQuery } from "../../control/api/scheduleApi";
import { useSelector } from "react-redux";
import TableContainer from "../../components/tabel/TabelContainer";
import { toast } from "react-toastify";
import {
  useCreateLogMutation,
  useGetMyLogQuery,
} from "../../control/api/logApi";

const columns = [
  { label: "No" },
  { label: "Nama Guru" },
  { label: "Nama Ujian" },
  { label: "Waktu" },
  { label: "Aksi" },
];
const CbtList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  const [detail, setDetail] = useState("");

  const { user } = useSelector((state) => state.auth);

  const { data: rawData = {} } = useGetSchedulesByGradeQuery({
    grade: user?.grade_id,
    page,
    limit,
    search,
  });
  const { schedules = [], totalPages, totalData } = rawData;
  const [createLog, { data, isLoading, isSuccess, error, reset }] =
    useCreateLogMutation();

  const { data: log } = useGetMyLogQuery(
    { nis: user?.nis, quiz: detail?.quiz_id },
    { skip: !user?.nis || !detail?.quiz_id }
  );

  const goToLink = () => {
    if (token === detail.token) {
      if (log?.isActive && log.quiz_id === detail.quiz_id) {
        setToken("");
        return toast.warning(`Anda sedang mengerjakan ujian ${detail.name}`);
      }

      if (log?.isDone && log.quiz_id === detail.quiz_id) {
        setToken("");

        return toast.warning(`Anda sudah mengerjakan ujian ${detail.name}`);
      }

      const data = { quizId: detail.quiz_id, nis: user?.nis };

      createLog(data);
    } else {
      setToken("");
      toast.warning("Token yang anda masukan salah");
    }
  };

  const closeHandler = () => {
    setDetail("");
    setToken("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);

      const formatted = detail.name.replace(/\s+/g, "-");
      window.location.href = `/cbt-halaman/${formatted}/${detail.quiz_id}/${detail.time}`;

      reset();

      localStorage.removeItem("questions");
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, data, error]);

  return (
    <div
      className={`d-flex gap-2 flex-wrap align-items-start justify-content-center`}
      style={{ height: "100%", overflow: "auto" }}
    >
      <TableContainer
        page={page}
        setPage={(e) => setPage(e)}
        setLimit={(e) => setLimit(e)}
        onValue={(e) => setSearch(e)}
        totalPages={totalPages}
      >
        <table className="table table-striped table-hover">
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
            {schedules?.map((item, i) => (
              <tr key={i}>
                <td className="text-center">{i + 1 + (page - 1) * limit}</td>
                <td>{item.teacher}</td>
                <td>{item.name}</td>
                <td className="align-middle text-center">{`${item.time} Menit`}</td>
                <td className="align-middle text-center">
                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#token"
                    onClick={() => setDetail(item)}
                  >
                    Ikuti Ujian
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      <div
        className="modal fade"
        id="token"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Masukan Token <span>{detail.name}</span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Masukan Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeHandler}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={goToLink}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CbtList;
