import React from "react";

const FormComponent = () => {
  return (
    <div className="d-flex flex-column gap-2 rounded p-2 shadow mt-2">
      <p className="m-0 h5">Tambahkan Data Tingkat</p>

      <form action="" className="d-flex flex-column gap-2">
        <input
          type="text"
          name="name"
          id=""
          placeholder="Tingkat"
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
