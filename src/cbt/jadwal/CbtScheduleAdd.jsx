import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetHomebasesQuery } from "../../control/api/homebaseApi";
import { useGetTeachersQuery } from "../../control/api/teacherApi";
import { useGetGradesQuery } from "../../control/api/gradeApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";
import { useCreateScheduleMutation } from "../../control/api/scheduleApi";
import { useGetQuizesQuery } from "../../control/api/quizApi";

const CbtScheduleAdd = ({ total, detail, id }) => {
  const page = "";
  const limit = "";
  const search = "";

  const [homeId, setHomeId] = useState(0);
  const [teacherId, setTeacherId] = useState(0);
  const [quizId, setQuizId] = useState(0);
  const [gradeId, setGradeId] = useState(0);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const { data: homebases } = useGetHomebasesQuery();
  const { data: rowData = {} } = useGetTeachersQuery({ page, limit, search });
  const { teachers = [] } = rowData;
  const { data: grades } = useGetGradesQuery();
  const { data: rawData2 = {} } = useGetQuizesQuery({
    page,
    limit,
    search,
    teacherId,
  });
  const { quizes = [] } = rawData2;
  const [createSchdule, { data, isSuccess, isLoading, error, reset }] =
    useCreateScheduleMutation();

  const createHandler = () => {
    if (!homeId || !teacherId || !gradeId || !name) {
      toast.error("Harap isi semua data!");
      return;
    }

    const data = { homeId, teacherId, gradeId, name, id, quizId, time };

    createSchdule(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();

      setHomeId("");
      setTeacherId("");
      setGradeId("");
      setName("");
      setQuizId("");
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (detail) {
      setHomeId(detail?.homebase_id);
      setTeacherId(detail?.teacher_id);
      setName(detail?.schedule);
      setTime(detail?.time);
      setGradeId(detail?.grade_id);
      setQuizId(detail?.quiz_id);
    }
  }, [detail]);

  useEffect(() => {
    if (user?.role === "teacher") {
      setTeacherId(user?.id);
    }
  }, [user]);
  return (
    <div className="container-fluid d-flex align-items-center justify-content-between p-2 rounded shadow bg-white">
      <p className="m-0 h6">
        Jumlah Ujian: <span>{total}</span>
      </p>
      <div className="d-flex gap-1">
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#modal-add"
          type="button"
        >
          + Tambah
        </button>
        <button className="btn btn-danger">- Hapus</button>
      </div>

      <div
        className="modal fade"
        id="modal-add"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Buat Ujian
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-column gap-2">
              <select
                name="homeId"
                id=""
                value={homeId || ""}
                onChange={(e) => setHomeId(e.target.value)}
                className="form-control"
                required
              >
                <option value={0} hidden>
                  Pilih Satuan
                </option>
                {homebases?.map((homebase) => (
                  <option key={homebase.id} value={homebase.id}>
                    {homebase.name}
                  </option>
                ))}
              </select>

              {role === "admin" && (
                <select
                  name="teacherId"
                  id=""
                  value={teacherId || ""}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value={0} hidden>
                    Pilih guru
                  </option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              )}

              <select
                name="quizId"
                id=""
                value={quizId || ""}
                onChange={(e) => setQuizId(e.target.value)}
                className="form-control"
                required
              >
                <option value={0} hidden>
                  Pilih Bank Soal
                </option>
                {quizes?.map((quiz) => (
                  <option key={quiz.id} value={quiz.id}>
                    {quiz.quiz_name}
                  </option>
                ))}
              </select>

              <select
                name="gradeId"
                id=""
                value={gradeId || ""}
                onChange={(e) => setGradeId(e.target.value)}
                className="form-control"
                required
              >
                <option value={0} hidden>
                  Pilih Tingkat
                </option>
                {grades?.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.grade}
                  </option>
                ))}
              </select>

              <input
                type="text"
                className="form-control"
                placeholder="Nama Ujian"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="numeric"
                className="form-control"
                placeholder="Menit"
                value={time || ""}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Batal
              </button>
              {isLoading ? (
                <BtnLoader />
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createHandler}
                >
                  Simpan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CbtScheduleAdd;
