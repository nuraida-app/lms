import React, { useEffect, useState } from "react";
import { useAddJuzMutation } from "../../control/api/quranApi";
import { toast } from "react-toastify";

const Form = ({ detail, close }) => {
  const [juz, setJuz] = useState("");
  const [id, setId] = useState("");
  const [lines, setLines] = useState("");

  const [addJuz, { data, isSuccess, isLoading, error, reset }] =
    useAddJuzMutation();

  const addHandler = (e) => {
    e.preventDefault();

    const data = { id, juz };

    addJuz(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();

      setId("");
      setJuz("");
      close();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (detail) {
      setJuz(detail.name);
      setId(detail.id);
    }
  }, [detail]);

  return (
    <form
      onSubmit={addHandler}
      className="p-2 rounded border shadow d-flex flex-column gap-2 bg-white mt-2"
    >
      <p className="m-0 h6">Tambah Juz</p>

      <input
        type="text"
        name="juz"
        id="juz"
        className="form-control"
        placeholder="Tambah Juz"
        value={juz || ""}
        onChange={(e) => setJuz(e.target.value)}
      />

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-warning" onClick={close}>
          Batal
        </button>
        <button className="btn btn-success" type="submit" disabled={isLoading}>
          Simpan
        </button>
      </div>
    </form>
  );
};

export default Form;
