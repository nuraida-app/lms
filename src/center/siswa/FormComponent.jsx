import React, { useEffect, useState } from "react";
import { useCreateStudentMutation } from "../../control/api/studentApi";
import { toast } from "react-toastify";

const FormComponent = ({ student, clear }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nis, setNis] = useState("");

  const [createStudent, { data, isSuccess, isLoading, error, reset }] =
    useCreateStudentMutation();

  const addHandler = (e) => {
    e.preventDefault();

    if (!name || !nis) {
      toast.error("Semua data harus diisi");
      return;
    }

    const data = { id, nis, name };

    createStudent(data);
  };

  const cancelHandler = () => {
    setId("");
    setName("");
    setNis("");
    clear();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      setId("");
      setName("");
      setNis("");
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (student) {
      setId(student.id);
      setName(student.name);
      setNis(student.nis);
    }
  }, [student]);
  return (
    <div className="mt-2 p-2 shadow rounded d-flex flex-column gap-2 bg-white border border-2">
      <p className="h5">Tambahkan Peseta Didik</p>
      <form className="d-flex flex-column gap-2" onSubmit={addHandler}>
        <input
          type="number"
          name="name"
          id=""
          placeholder="NIS"
          className="form-control"
          value={nis || ""}
          onChange={(e) => setNis(e.target.value)}
          required
        />

        <input
          type="text"
          name="name"
          id=""
          placeholder="Nama Lengkap"
          className="form-control"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="d-flex align-items-center justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-danger"
            onClick={cancelHandler}
          >
            Batal
          </button>

          <button
            type="button"
            className="btn btn-info"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            upload
          </button>

          <button type="submit" className="btn btn-success">
            {isLoading ? `Loading...` : `+ Tambahkan`}
          </button>
        </div>
      </form>

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
