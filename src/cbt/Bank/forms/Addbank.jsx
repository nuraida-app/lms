import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetHomebasesQuery } from "../../../control/api/homebaseApi";
import { useGetTeachersQuery } from "../../../control/api/teacherApi";
import { useGetGradesQuery } from "../../../control/api/gradeApi";
import { useCreateQuizMutation } from "../../../control/api/quizApi";
import { toast } from "react-toastify";
import BtnLoader from "../../../components/loader/BtnLoader";

const Addbank = ({ detail, id }) => {
  const page = "";
  const limit = "";
  const search = "";

  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const { data: homebases } = useGetHomebasesQuery();
  const { data: rowData = {} } = useGetTeachersQuery({ page, limit, search });
  const { teachers = [] } = rowData;
  const { data: grades } = useGetGradesQuery();
  const [createQuiz, { data, isSuccess, isLoading, error, reset }] =
    useCreateQuizMutation();

  const [homeId, setHomeId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [shuffle, setShuffle] = useState("");
  const [quizName, setQuizName] = useState("");
  const [mc, setMc] = useState("");
  const [essay, setEssay] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id,
      homeId,
      teacherId,
      gradeId,
      shuffle,
      quizName,
      mc,
      essay,
    };

    createQuiz(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();

      window.location.reload();
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
      setGradeId(detail?.grade_id);
      setShuffle(detail?.shuffle);
      setMc(detail?.mc_weight);
      setEssay(detail?.essay_weight);
      setQuizName(detail?.quiz_name);
    }
  }, [detail]);

  return (
    <div className="rounded shadow d-flex flex-column gap-2 mt-2 p-2">
      <p className="h5 m-0">Buat Bank Soal Baru</p>

      <form
        action=""
        className="d-flex flex-column gap-2"
        onSubmit={handleSubmit}
      >
        <select
          name="homeId"
          id=""
          value={homeId}
          onChange={(e) => setHomeId(e.target.value)}
          className="form-control"
          required
        >
          <option value={""} disabled hidden>
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
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="form-control"
            required
          >
            <option value={""} disabled hidden>
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
          name="gradeId"
          id=""
          value={gradeId}
          onChange={(e) => setGradeId(e.target.value)}
          className="form-control"
          required
        >
          <option value={0}>Pilih Tingkat</option>
          {grades?.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.grade}
            </option>
          ))}
        </select>

        <select
          name="shuffle"
          id=""
          value={shuffle}
          onChange={(e) => setShuffle(e.target.value)}
          className="form-control"
          required
        >
          <option value="" disabled hidden>
            Acak
          </option>
          <option value={true}>Ya</option>
          <option value={false}>Tidak</option>
        </select>

        <input
          type="text"
          name=""
          id=""
          className="form-control"
          placeholder="Nama Bank Soal"
          required
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />

        <div className="input-group">
          <span className="input-group-text">Bobot PG</span>
          <input
            type="number"
            className="form-control"
            placeholder="60"
            value={mc}
            onChange={(e) => setMc(e.target.value)}
          />
        </div>

        <div className="input-group">
          <span className="input-group-text">Bobot Essay</span>
          <input
            type="number"
            className="form-control"
            placeholder="40"
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
          />
        </div>

        {isLoading ? (
          <BtnLoader />
        ) : (
          <button type="submit" className="btn btn-success">
            + Tambahkan
          </button>
        )}
      </form>
    </div>
  );
};

export default Addbank;
