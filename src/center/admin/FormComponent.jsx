import React from "react";

const FormComponent = () => {
  return (
    <div className="mt-2 p-2 shadow rounded d-flex flex-column gap-2">
      <p className="h5">Tambahkan Administrator</p>

      <form action="" className="d-flex flex-column gap-2">
        <input
          type="text"
          name="name"
          id=""
          placeholder="Nama Admin"
          className="form-control"
        />

        <input
          type="password"
          name="password"
          id=""
          placeholder="Masukan Password"
          className="form-control"
        />

        <button type="submit" className="btn btn-success">
          + Tambahkan
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
