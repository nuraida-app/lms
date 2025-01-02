import React, { useState } from "react";

const FormComponent = () => {
  const [value, setValue] = useState("default");
  return (
    <div className="mt-2 p-2 shadow rounded d-flex flex-column gap-2">
      <p className="h5">Tambah Guru</p>

      <input
        type="number"
        name="nip"
        id=""
        className="form-control"
        placeholder="NIP"
      />

      <input
        type="text"
        name="nama"
        id=""
        className="form-control"
        placeholder="Nama Lengkap"
      />

      <select
        className="form-select"
        aria-label="Default select example"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="default">--Pilih Mapel--</option>
        <option value="province">Provinsi</option>
        <option value="region">Kota / Kabupaten</option>
        <option value="district">Desa</option>
      </select>

      <div className="custom-control custom-radio d-flex gap-3 ">
        <input
          type="radio"
          className="custom-control-input pointer"
          id="customCheck1"
        />
        <label className="custom-control-label" htmlFor="customCheck1">
          SMP
        </label>
      </div>

      <div className="custom-control custom-radio d-flex gap-3 ">
        <input
          type="radio"
          className="custom-control-input pointer"
          id="customCheck1"
        />
        <label className="custom-control-label" htmlFor="customCheck1">
          SMA
        </label>
      </div>

      <button className="btn btn-success">+ Tambahkan</button>
    </div>
  );
};

export default FormComponent;
