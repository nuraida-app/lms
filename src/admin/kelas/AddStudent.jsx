import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  useAddStudentToClassMutation,
  useUploadToClassMutation,
} from "../../control/api/studentApi";
import BtnLoader from "../../components/loader/BtnLoader";
import { toast } from "react-toastify";

const AddStudent = () => {
  const params = useParams();
  const gradeId = params.gradeId;
  const code = params.code;

  const [file, setFile] = useState(null);
  const [nis, setNis] = useState("");

  const [
    addStudentToClass,
    {
      data: msg,
      isSuccess: addSuccess,
      isLoading: addLoading,
      error: addError,
      reset,
    },
  ] = useAddStudentToClassMutation();
  const [uploadStudents, { data, isSuccess, error, isLoading }] =
    useUploadToClassMutation();

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

        uploadStudents({ gradeId, code, body: result });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const addStudent = (e) => {
    e.preventDefault();

    const data = { nis, gradeId, code };

    addStudentToClass(data);
  };

  const download = () => {
    window.open("/temp/siswa_kelas_template.xlsx", "_blank");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setFile(null);
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, data, error]);

  useEffect(() => {
    if (addSuccess) {
      toast.success(msg.message);

      reset();
      setNis("");
    }

    if (addError) {
      toast.error(addError.data.message);

      reset();
    }
  }, [msg, addSuccess, addError]);
  return (
    <div className="d-flex flex-column gap-2 rounded shadow p-2 mt-2">
      <p className="m-0 h5">Tambahkan Siswa</p>

      <form
        action=""
        className="d-flex flex-column gap-2"
        onSubmit={addStudent}
      >
        <input
          type="text"
          name="nis"
          id=""
          placeholder="Masukan NIS"
          className="form-control"
          value={nis || ""}
          onChange={(e) => setNis(e.target.value)}
        />

        <button type="submit" className="btn btn-success">
          + Tambahkan
        </button>

        <button
          type="button"
          className="btn btn-info"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Unggah Berkas
        </button>
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
              <input
                type="file"
                name="file"
                id=""
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
              {isLoading ? (
                <BtnLoader />
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={uploadData}
                >
                  Unggah
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
