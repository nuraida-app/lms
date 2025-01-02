import React from "react";

const FormComponent = () => {
  return (
    <div className="mt-2 p-2 shadow rounded">
      <p className="h5">Tambahkan Sekolah</p>

      <form action="" className="d-flex flex-column gap-3">
        <input
          type="text"
          name="name"
          id=""
          className="form-control"
          placeholder="Nama Sekolah"
        />

        <button className="btn btn-success">+ Tambahkan</button>
      </form>
    </div>
  );
};

export default FormComponent;
