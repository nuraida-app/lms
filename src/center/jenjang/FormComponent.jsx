import React, { useEffect, useState } from "react";
import { useGetHomebasesQuery } from "../../control/api/homebaseApi";
import { useCreateGradeMutation } from "../../control/api/gradeApi";
import { toast } from "react-toastify";

const FormComponent = ({ detail, clear }) => {
  const [id, setId] = useState("");
  const [home, setHomeid] = useState("");
  const [grade, setGrade] = useState("");

  const { data: homes } = useGetHomebasesQuery();
  const [createGrade, { data, isSuccess, isLoading, error, reset }] =
    useCreateGradeMutation();

  const addHandler = (e) => {
    e.preventDefault();

    const data = { id, grade, home };

    createGrade(data);
  };

  const cancelHandler = () => {
    setGrade("");
    setHomeid("");
    setId("");
    clear();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setGrade("");
      setHomeid("");
      setId("");
      clear();
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (detail) {
      setId(detail.id);
      setGrade(detail.grade);
      setHomeid(detail.homebase_id);
    }
  }, [detail]);

  return (
    <div className="mt-2 p-2 shadow rounded">
      <p className="h5">Tambahkan Jenjang Pendidikan</p>

      <form
        action=""
        className="d-flex flex-column gap-2"
        onSubmit={addHandler}
      >
        <select
          name="home"
          id="home1"
          className="form-select"
          value={home || ""}
          onChange={(e) => setHomeid(e.target.value)}
        >
          <option value="" hidden>
            Pilih Satuan
          </option>
          {homes?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          id=""
          className="form-control"
          placeholder="Jenjang Pendidika"
          value={grade || ""}
          onChange={(e) => setGrade(e.target.value)}
        />

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-warning"
            onClick={cancelHandler}
          >
            Batal
          </button>
          <button type="submit" className="btn btn-success">
            {isLoading ? `Loading...` : `+ Tambahkan`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
