import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAddTypeMutation } from "../../control/api/metricApi";

const FormComponent = ({ detail, clear }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const [addType, { data, isSuccess, isLoading, error, reset }] =
    useAddTypeMutation();

  const addHandler = (e) => {
    e.preventDefault();

    if (!name) {
      toast.warning("Jenis Penilaian harus diisi!");
    }

    const data = { id, name };

    addType(data);
  };

  const cancelHandler = () => {
    setId("");
    setName("");
    clear();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setName("");
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
      setName(detail.name);
    }
  }, [detail]);

  return (
    <form
      className="d-flex flex-column bg-white rounded shadow gap-2 border border-2 p-2"
      onSubmit={addHandler}
    >
      <p className="m-0 h6">Tambah Jenis Penilaian</p>

      <input
        type="text"
        name="type"
        id="1"
        className="form-control"
        required
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        placeholder="Jenis Penilaian"
      />

      <div className="text-end">
        <button
          type="button"
          className="btn btn-warning me-2"
          onClick={cancelHandler}
        >
          Batal
        </button>
        <button type="submit" className="btn btn-success me-2">
          {isLoading ? `Loading...` : `+ Tambahkan`}
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
