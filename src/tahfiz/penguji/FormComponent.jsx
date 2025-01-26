import React, { useEffect, useState } from "react";
import { useAddExaminerMutation } from "../../control/api/examinerApi";
import { toast } from "react-toastify";

const FormComponent = ({ examiner, clear }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const [addExamine, { data, isSuccess, isLoading, error, reset }] =
    useAddExaminerMutation();

  const addHandler = (e) => {
    e.preventDefault();

    if (!name) {
      return toast.warning("Data harus diisi");
    }

    const data = { id, name };

    addExamine(data);
  };

  const cancelHandler = () => {
    setId("");
    setName("");
    clear();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setId("");
      setName("");
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (examiner) {
      setId(examiner.id);
      setName(examiner.name);
    }
  }, [examiner]);
  return (
    <form
      className="d-flex flex-column gap-2 bg-white rounded shadow p-2 border border-2"
      onSubmit={addHandler}
    >
      <p className="m-0 h6">Tambah Penguji</p>

      <input
        type="text"
        name="examiner"
        id="1"
        className="form-control"
        placeholder="Nama Penguji"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="text-end">
        <button
          type="button"
          className="btn btn-warning me-2"
          onClick={cancelHandler}
        >
          Batal
        </button>
        <button type="submit" className="btn btn-success">
          {isLoading ? `Loading...` : `+ Tambahkan`}
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
