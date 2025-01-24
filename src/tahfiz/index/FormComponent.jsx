import React, { useEffect, useState } from "react";
import { useAddSurahMutation } from "../../control/api/quranApi";
import { toast } from "react-toastify";

const FormComponent = ({ surah, clear }) => {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [count, setCount] = useState("");

  const [addSurah, { data, isSuccess, isLoading, error, reset }] =
    useAddSurahMutation();

  const addHandler = (e) => {
    e.preventDefault();

    const data = { id, name, count };

    addSurah(data);
  };

  const cancelHandler = () => {
    setId("");
    setName("");
    setCount("");
    clear();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setId("");
      setName("");
      setCount("");
      reset();
    }

    if (error) {
      console.log(error);
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (surah) {
      setId(surah.id);
      setName(surah.surah);
      setCount(surah.ayat);
    }
  }, [surah]);

  return (
    <form
      className="p-2 rounded border border-2 shadow d-flex flex-column gap-2 mt-2 bg-white"
      onSubmit={addHandler}
    >
      <p className="m-0 h6">Tambah Surah</p>

      <input
        type="text"
        name="surah"
        id="1"
        className="form-control"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Nama Surah"
      />

      <input
        type="number"
        name="surah"
        id="2"
        className="form-control"
        value={count || ""}
        onChange={(e) => setCount(e.target.value)}
        required
        placeholder="Jumlah Ayat"
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
  );
};

export default FormComponent;
