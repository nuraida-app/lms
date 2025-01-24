import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAddCategoryMutation } from "../../control/api/metricApi";

const AddCat = ({ category, clear }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [addCategory, { data, isSuccess, isLoading, error, reset }] =
    useAddCategoryMutation();

  const categoryHandler = (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("Data harus diisi");
    }
    const data = { id, name };

    addCategory(data);
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
      console.log(error);
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (category) {
      setId(category.id);
      setName(category.category);
    }
  }, [category]);

  console.log(category);
  return (
    <form
      className="p-2 rounded border border-2 d-flex flex-column gap-2 bg-white"
      onSubmit={categoryHandler}
    >
      <p className="m-0 h6">Tambah Kategori</p>

      <input
        type="text"
        name="category"
        id="i"
        className="form-control"
        required
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        placeholder="Kategori Penilaian"
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

export default AddCat;
