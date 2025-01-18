import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUploadQuestionsMutation } from "../../../control/api/questionApi";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const Upload = () => {
  const params = useParams();
  const { bankid } = params;
  const [file, setFile] = useState("");

  const [uploadQuestions, { data, isSuccess, isLoading, error, reset }] =
    useUploadQuestionsMutation();

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

        uploadQuestions({ id: bankid, body: result });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setFile(null);
      reset();
      window.location.reload();
    }

    if (error) {
      toast.error(error.data.message);
      console.log(error);
      reset();
    }
  }, [data, isSuccess, error]);
  return (
    <div>
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#tambah"
      >
        Upload
      </button>

      <div
        className="modal fade"
        id="tambah"
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
                Upload Soal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="file"
                className="form-control"
                onChange={handleFile}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setFile("")}
              >
                Tutup
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={uploadData}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
