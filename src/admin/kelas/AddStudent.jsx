import React from "react";

const AddStudent = () => {
  return (
    <div className="d-flex flex-column gap-2 rounded shadow p-2 mt-2">
      <p className="m-0 h5">Tambahkan Siswa</p>

      <form action="" className="d-flex flex-column gap-2">
        <input
          type="text"
          name="nis"
          id=""
          placeholder="Masukan NIS"
          className="form-control"
        />

        <button className="btn btn-success">+ Tambahkan</button>

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
      </form>
    </div>
  );
};

export default AddStudent;
