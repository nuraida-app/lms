import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCreateClassMutation } from "../../control/api/classApi";
import BtnLoader from "../../components/loader/BtnLoader";
import { useGetGradesQuery } from "../../control/api/gradeApi";

const FormComponent = ({ detail }) => {
  const { data: grades } = useGetGradesQuery();
  const [createClass, { data, isSuccess, isLoading, error, reset }] =
    useCreateClassMutation();

  const [gradeId, setGradeId] = useState("default");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (gradeId === "default") {
      toast.error("Tingkat harus dipilih");
    }

    const data = {
      gradeId,
      name,
      code,
    };

    createClass({ body: data, id });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);

      setGradeId("");
      setCode("");
      setName("");
      reset();
      close();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (detail) {
      setGradeId(detail?.grade_id);
      setName(detail?.name);
      setCode(detail?.code);
      setId(detail?.id);
    }
  }, [detail]);

  return (
    <div className="d-flex flex-column gap-2 rounded p-2 shadow mt-2 bg-white border border-2">
      <p className="m-0 h5">Tambahkan Data Kelas</p>

      <form
        action=""
        className="d-flex flex-column gap-2"
        onSubmit={handleSubmit}
      >
        <select
          name="grade"
          id=""
          className="form-control"
          value={gradeId}
          onChange={(e) => setGradeId(e.target.value)}
        >
          <option value="default">--Pilih Tingkat--</option>
          {grades?.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.grade}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          id=""
          placeholder="Kelas"
          className="form-control"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          name="code"
          id=""
          placeholder="Kode Kelas"
          className="form-control"
          value={code || ""}
          onChange={(e) => setCode(e.target.value)}
        />

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

export default FormComponent;
