import React, { useEffect, useState } from "react";
import { useGetSubjectsQuery } from "../../control/api/subjectApi";
import { useGetHomebasesQuery } from "../../control/api/homebaseApi";
import {
  useCreateTeacherMutation,
  useUploadTeachersMutation,
} from "../../control/api/teacherApi";
import { useGetClassesQuery } from "../../control/api/classApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";
import * as XLSX from "xlsx";

const FormComponent = ({ detail, id }) => {
  const page = "";
  const limit = "";
  const search = "";
  const [file, setFile] = useState(null);

  const { data: homebase } = useGetHomebasesQuery();
  const { data: rowData1 = {} } = useGetClassesQuery({ page, limit, search });
  const { classes = [] } = rowData1;
  const { data: rowData = {} } = useGetSubjectsQuery({ page, limit, search });
  const { subjects = [] } = rowData;
  const [createTeacher, { data, isSuccess, isLoading, error, reset }] =
    useCreateTeacherMutation();
  const [
    uploadTeachers,
    {
      data: msg,
      isSuccess: uSuccess,
      isLoading: uLoading,
      error: uError,
      reset: uReset,
    },
  ] = useUploadTeachersMutation();

  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [subjectCodes, setSubjectCodes] = useState([]);
  const [homeIds, setHomeIds] = useState([]);
  const [homeroom, setHomeroom] = useState("");
  const [classCode, setClassCode] = useState("");

  const handleSubject = (code) => {
    setSubjectCodes((prev) =>
      prev.includes(code)
        ? prev.filter((item) => item !== code)
        : [...prev, code]
    );
  };

  const handleHomebase = (id) => {
    setHomeIds((prev) =>
      prev.includes(id) ? prev.filter((code) => code !== id) : [...prev, id]
    );
  };

  const handleHomeroom = (value) => {
    const valid = parseInt(value);
    setHomeroom(valid);
    if (value === "2") {
      setClassCode("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = { id, nip, name, subjectCodes, homeIds, homeroom, classCode };

    createTeacher(data);
  };

  const download = () => {
    window.open("/temp/guru_template.xlsx", "_blank");
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

        uploadTeachers(result);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      setNip("");
      setName("");
      setHomeroom("");
      setClassCode("");
      setSubjectCodes([]);
      setHomeIds([]);

      window.location.reload();
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
    if (detail) {
      setNip(detail?.nip || "");
      setName(detail?.name || "");
      setHomeroom(detail?.homeroom || "");
      setClassCode(detail?.class_code || "");
      setSubjectCodes(detail?.subject_code.map(String) || []);
      setHomeIds(detail?.homebase_id || []);
    }
  }, [detail, id]);

  return (
    <div className="mt-2 p-2 shadow rounded d-flex flex-column gap-2">
      <p className="h5">Tambahkan Guru</p>

      <form className="d-flex flex-column gap-2" onSubmit={submitHandler}>
        <input
          type="text"
          name="nip"
          className="form-control"
          placeholder="NIP"
          value={nip}
          onChange={(e) => setNip(e.target.value)}
          required
        />

        <input
          type="text"
          name="nama"
          className="form-control"
          placeholder="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          name=""
          id=""
          className="form-control"
          value={homeroom}
          onChange={(e) => handleHomeroom(e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Pilih Wali Kelas
          </option>
          <option value="1">Ya</option>
          <option value="2">Tidak</option>
        </select>

        {homeroom === 1 && (
          <div
            style={{ height: 200 }}
            className="p-2 rounded border border-sm overflow-auto"
          >
            <p className="m-0">Pilih Kelas</p>
            {classes?.map((item) => (
              <div key={item.id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id={`class-${item.id}`}
                  checked={classCode === item.code ? true : false}
                  onChange={() => setClassCode(item.code)}
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        )}

        <div
          style={{ height: 200 }}
          className="p-2 rounded border border-sm overflow-auto"
        >
          <p className="m-0">Pilih Mata Pelajaran</p>
          {subjects?.map((item, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                checked={subjectCodes.includes(item.code)}
                onChange={() => handleSubject(item.code)}
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                {item.name}
              </label>
            </div>
          ))}
        </div>

        <div style={{ height: 100 }} className="p-2 rounded border border-sm">
          <p className="m-0">Pilih tempat satuan ajar</p>
          {homebase?.map((item) => (
            <div key={item.id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={`home-${item.id}`}
                checked={homeIds.includes(item.id)}
                onChange={() => handleHomebase(item.id)}
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                {item.name}
              </label>
            </div>
          ))}
        </div>

        {isLoading ? (
          <BtnLoader />
        ) : (
          <button type="submit" className="btn btn-success">
            + Tambahkan
          </button>
        )}
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
              {uLoading ? (
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

export default FormComponent;
