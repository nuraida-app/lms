import React, { useEffect, useState } from "react";
import { useAddSurahMutation } from "../../control/api/quranApi";
import { toast } from "react-toastify";

const FormComponent = ({ surah, clear }) => {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [lines, setLines] = useState("");

  const [addSurah, { data, isSuccess, isLoading, error, reset }] =
    useAddSurahMutation();

  const addHandler = (e) => {
    e.preventDefault();

    const data = { id, name, count: parseInt(count), lines: parseInt(lines) };

    addSurah(data);
  };

  const cancelHandler = () => {
    setId("");
    setName("");
    setCount("");
    setLines("");
    clear();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setId("");
      setName("");
      setCount("");
      setLines("");
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
      setName(surah.name);
      setCount(surah.ayat);
      setLines(surah.lines);
    }
  }, [surah]);

  return (
    <form
      className="p-2 rounded  border-2 shadow d-flex flex-column gap-2 mt-2 bg-white"
      onSubmit={addHandler}
    >
      <p className="m-0 h6">Tambah Surah</p>

      <input
        type="text"
        name="surah"
        id="surah"
        className="form-control"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Nama Surah"
      />

      <input
        type="text"
        name="ayat"
        id="ayat"
        className="form-control"
        value={count || ""}
        onChange={(e) => setCount(e.target.value)}
        required
        placeholder="Jumlah Ayat"
      />

      <input
        type="text"
        name="lines"
        id="lines"
        className="form-control"
        value={lines || ""}
        onChange={(e) => setLines(e.target.value)}
        placeholder="Jumlah Baris"
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
