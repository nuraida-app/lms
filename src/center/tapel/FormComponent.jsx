import React, { useEffect, useState } from "react";
import { useAddYearMutation } from "../../control/api/yearApi";
import { toast } from "react-toastify";

const FormComponent = ({ year, clear }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const [addYear, { data, isSuccess, isLoading, error, reset }] =
    useAddYearMutation();

  const addHandler = (e) => {
    e.preventDefault();
    const data = { id, name };
    addYear(data);
  };

  const cancelHandler = () => {
    clear();
    setId("");
    setName("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setId("");
      setName("");
      reset();
      clear();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (year) {
      setId(year.id);
      setName(year.name);
    }
  }, [year]);
  return (
    <div className="p-2 d-flex flex-column gap-2 border border-2 shadow rounded bg-white">
      <p className="m-0 h5">Tambah Tahun Ajar</p>

      <form
        action=""
        className="d-flex flex-column gap-2"
        onSubmit={addHandler}
      >
        <input
          type="text"
          name="year"
          id="1"
          className="form-control"
          placeholder="Tahun Ajar"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="text-end">
          <button
            type="button"
            className="btn btn-danger me-2"
            onClick={cancelHandler}
          >
            Batal
          </button>
          <button type="submit" className="btn btn-success">
            {isLoading ? "Loading..." : "+ Tambahkan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
