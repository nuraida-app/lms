import React, { useEffect, useState } from "react";
import {
  useCreateStudentMutation,
  useUploadStudentsMutation,
} from "../../control/api/studentApi";
import { toast } from "react-toastify";
import { useGetYearsQuery } from "../../control/api/yearApi";
import * as XLSX from "xlsx";

const FormComponent = ({ student, clear }) => {
  const page = "";
  const limit = "";
  const search = "";

  const [id, setId] = useState("");
  const [yearid, setYear] = useState("");
  const [name, setName] = useState("");
  const [nis, setNis] = useState("");
  const [file, setFile] = useState(null);

  const [createStudent, { data, isSuccess, isLoading, error, reset }] =
    useCreateStudentMutation();
  const { data: rawData = {} } = useGetYearsQuery({ page, limit, search });
  const { data: years = [] } = rawData;
  const [
    uploadStudents,
    {
      data: msg,
      isSuccess: uSuccess,
      isLoading: uLoading,
      error: uError,
      reset: uReset,
    },
  ] = useUploadStudentsMutation();

  const addHandler = (e) => {
    e.preventDefault();

    if (!name || !nis || !yearid) {
      toast.error("Semua data harus diisi");
      return;
    }

    const data = { id, nis, name, yearid };

    createStudent(data);
  };

  const download = () => {
    window.open("/temp/siswa_template.xlsx", "_blank");
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadData = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          range: 1,
        });

        const filteredData = jsonData.filter((row) => row.length > 0);

        const result = { data: filteredData };

        uploadStudents(result);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const cancelHandler = () => {
    setId("");
    setName("");
    setNis("");
    setYear("");
    clear();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      setId("");
      setName("");
      setYear("");
      setNis("");
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (uSuccess) {
      toast.success(msg.message);
      uReset();
      setFile(null);
    }

    if (uError) {
      toast.error(uError.data.message);
      uReset();
    }
  }, [msg, uSuccess, uError]);

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
        <select
          name="yearid"
          id="1"
          className="form-select"
          required
          value={yearid || ""}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="" hidden>
            Pilih Tahun Ajar
          </option>
          {years?.map((year, i) => (
            <option key={i} value={year.id}>
              {year.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="name"
          id="2"
          placeholder="NIS"
          className="form-control"
          value={nis || ""}
          onChange={(e) => setNis(e.target.value)}
          required
        />

        <input
          type="text"
          name="name"
          id="3"
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
              <input
                type="file"
                name="file"
                className="form-control"
                onChange={handleFile}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                onClick={download}
              >
                Template
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={uploadData}
              >
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
