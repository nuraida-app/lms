import React from "react";

const FormComponent = () => {
  return (
    <div className="mt-2 p-2 shadow rounded d-flex flex-column gap-2">
      <p className="h5">Tambahkan Peseta Didik</p>
      <form className="d-flex flex-column gap-2">
        <input
          type="number"
          name="name"
          id=""
          placeholder="NIS"
          className="form-control"
        />

        <input
          type="text"
          name="name"
          id=""
          placeholder="Nama Lengkap"
          className="form-control"
        />

        <button type="button" className="btn btn-success">
          + Tambahkan
        </button>
      </form>

      <button
        type="button"
        className="btn btn-info"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Unggah File
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Pilih file
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
