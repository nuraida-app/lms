import React, { useState, useEffect } from "react";
import { useAddHomebaseMutation } from "../../control/api/homebaseApi";
import { toast } from "react-toastify";

const FormComponent = ({ homebase, clear }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");

  const [addHomebase, { data, isSuccess, isLoading, error, reset }] =
    useAddHomebaseMutation();

  const addHandler = (e) => {
    e.preventDefault();

    const data = { id, name };

    addHomebase(data);
  };

  const closeHandler = () => {
    setId("");
    setName("");
    clear();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setName("");
      setId("");
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (homebase) {
      setId(homebase.id);
      setName(homebase.name);
    }
  }, [homebase]);

  return (
    <div className="mt-2 p-2 shadow rounded">
      <p className="h5">Tambahkan Satuan</p>

      <form action="" className="d-flex flex-column gap-3">
        <input
          type="text"
          name="name"
          id=""
          className="form-control"
          placeholder="Nama Satuan Pendidikan"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-warning"
            onClick={closeHandler}
          >
            Batal
          </button>
          <button
            type="submit"
            className="btn btn-success"
            onClick={addHandler}
          >
            {isLoading ? `Loading...` : `+ Tambahkan`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
