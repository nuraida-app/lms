import React, { useState } from "react";

const FormComponent = () => {
  const [value, setValue] = useState("default");
  return (
    <div className="mt-2 p-2 shadow rounded d-flex flex-column gap-2">
      <p className="h5">Tambahkan Guru</p>

      <form action="" className="d-flex flex-column gap-2">
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
      </form>

      <button
        type="button"
        className="btn btn-info"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Unggah Berkas
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Pilih Berkas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-column align-items-end gap-2">
              <input type="file" name="file" id="" className="form-control" />

              <button type="button" className="btn btn-warning">
                Template
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
              <button type="button" className="btn btn-primary">
                Unggah
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
