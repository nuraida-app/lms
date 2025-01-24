import React, { useState, useEffect } from "react";
import { useAddIndicatorMutation } from "../../control/api/metricApi";
import { toast } from "react-toastify";

const AddIndicator = ({ categories, clear, indicator }) => {
  const [id, setId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");

  const [addIndicator, { data, isSuccess, isLoading, error, reset }] =
    useAddIndicatorMutation();

  const addhandler = (e) => {
    e.preventDefault();

    if (!categoryId || !name) {
      toast.warning("Data harus diisi!");
    }

    const data = { id, categoryId, name };

    addIndicator(data);
  };

  const cancelHandler = () => {
    setId("");
    setName("");
    setCategoryId("");
    clear();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setId("");
      setCategoryId("");
      setName("");
      reset();
    }

    if (error) {
      console.log(error);
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (indicator) {
      setId(indicator.id);
      setName(indicator.name);
      setCategoryId(indicator.category_id);
    }
  }, [indicator]);

  return (
    <form
      className="mt-2 rounded border border-2 bg-white shadow d-flex flex-column gap-2 p-2"
      onSubmit={addhandler}
    >
      <p className="m-0 h6">Tambah Indikator</p>

      <select
        name="cetegory"
        id="1"
        className="form-select"
        required
        value={categoryId || ""}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="" hidden>
          Pilih Kategori
        </option>
        {categories?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.category}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="form-control"
        placeholder="Nama Indikator"
        required
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

export default AddIndicator;
