import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TableContainer from "../../components/tabel/TabelContainer";
import { useNavigate } from "react-router-dom";
import {
  useDeleteScheduleMutation,
  useGetScheduleQuery,
  useGetSchedulesQuery,
  useUpdateStatusMutation,
} from "../../control/api/scheduleApi";
import CbtScheduleAdd from "./CbtScheduleAdd";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";

const columns = [
  { label: "No" },
  { label: "Nama Guru" },
  { label: "Nama Ujian" },
  { label: "Nama Bank Soal" },
  { label: "Tingkat" },
  { label: "Status" },
  { label: "Token" },
  { label: "Waktu" },
  { label: "Aksi" },
];

const CbtSchedules = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");

  const { data: rawData = {} } = useGetSchedulesQuery({ page, limit, search });
  const { rooms = [], totalPages, totalRecords } = rawData;
  const [updateStatus, { data, isSuccess, isLoading, error, reset }] =
    useUpdateStatusMutation();
  const { data: detail } = useGetScheduleQuery(id, { skip: !id });
  const [
    deleteSchedule,
    {
      data: msg,
      isSuccess: dSuccess,
      isLoading: dLoading,
      error: dError,
      reset: dReset,
    },
  ] = useDeleteScheduleMutation();

  const goToLink = (bankName, bankId, gradeId) => {
    const formatted = bankName.replace(/\s+/g, "-");
    navigate(`/cbt-laporan/${formatted}/${bankId}/${gradeId}`);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (dSuccess) {
      toast.success(msg.data);
      dReset();
    }

    if (dError) {
      toast.error(dError.data.message);
      dReset();
    }
  }, [msg, dSuccess, dError]);

  return (
    <Layout title={"Daftar Ujian"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-12 d-flex flex-column gap-2">
          <CbtScheduleAdd total={totalRecords} detail={detail} id={id} />

          <div
            style={{
              height: "calc(100vh - 150px)",
              overflow: "auto",
            }}
            className="rounded shadow"
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
                  {rooms.map((room, index) => (
                    <tr key={room.id}>
                      <th scope="col" className="text-center align-middle">
                        {(page - 1) * limit + index + 1}
                      </th>
                      <td className=" align-middle">{room.teacher}</td>
                      <td className="align-middle">{room.name}</td>
                      <td className="align-middle">{room.quiz}</td>
                      <td className="text-center align-middle">{room.grade}</td>
                      <td className="text-center align-middle">
                        <div
                          className="form-check form-switch pointer d-flex justify-content-center"
                          onClick={() => updateStatus(room.id)}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            checked={room.status ? true : false}
                            readOnly
                          />
                        </div>
                      </td>
                      <td className="text-center align-middle">{room.token}</td>
                      <td className="text-center align-middle">{`${room.time} Menit`}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              goToLink(room.quiz, room.quiz_id, room.grade_id)
                            }
                          >
                            Detail
                          </button>
                          <button
                            className="btn btn-warning"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-add"
                            onClick={() => setId(room.id)}
                          >
                            Edit
                          </button>

                          {dLoading ? (
                            <BtnLoader />
                          ) : (
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteSchedule(room.id)}
                            >
                              Hapus
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CbtSchedules;
