import React, { useEffect, useState } from "react";
import {
  useCreateSubjectMutation,
  useUploadSubjectsMutation,
} from "../../control/api/subjectApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";
import * as XLSX from "xlsx";

const FormComponent = ({ detail, id }) => {
  const [code, setCode] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const [createSubject, { data, isSuccess, isLoading, error, reset }] =
    useCreateSubjectMutation();
  const [
    uploadSubjects,
    {
      data: msg,
      isSuccess: uSuccess,
      isLoading: uLoading,
      error: uError,
      reset: uReset,
    },
  ] = useUploadSubjectsMutation();

  const createHandler = (e) => {
    e.preventDefault();

    if (!code || !subject) {
      return toast.error("Pastikan form diisi");
    }

    const data = { id, code, subject };

    createSubject(data);
  };

  const download = () => {
    window.open("/temp/mapel_template.xlsx", "_blank");
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

        uploadSubjects(result);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setCode("");
      setSubject("");
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, error, data, reset]);

  useEffect(() => {
    if (uSuccess) {
      toast.success(msg.message);
      reset();
      setFile(null);
    }

    if (uError) {
      toast.error(uError.data.message);
      uReset();
    }
  }, [msg, uSuccess, uError]);

  useEffect(() => {
    if (detail) {
      setCode(detail?.code || "");
      setSubject(detail?.name || "");
    }
  }, [detail]);

  useEffect(() => {
    if (isSuccess && id) {
      window.location.reload();
    }
  }, [isSuccess, id]);

  return (
    <div className="d-flex flex-column gap-2 mt-2 rounded shadow p-2 bg-white border border-2">
      <p className="m-0 h5">Tambahkan Mata Pelajaran</p>

      <form
        action=""
        className="d-flex flex-column gap-2"
        onSubmit={createHandler}
      >
        <input
          type="text"
          name="code"
          placeholder="Kode Mata Pelajaran"
          className="form-control"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          type="text"
          name="name"
          placeholder="Nama Mata Pelajaran"
          className="form-control"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {isLoading ? (
          <BtnLoader />
        ) : (
          <button type="submit" className="btn btn-success">
            + Tambahkan
          </button>
        )}

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
