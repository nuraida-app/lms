import React, { useEffect, useState } from "react";
import { useGetSubjectsQuery } from "../../control/api/subjectApi";
import { useGetHomebasesQuery } from "../../control/api/homebaseApi";
import { useCreateTeacherMutation } from "../../control/api/teacherApi";
import { useGetClassesQuery } from "../../control/api/classApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";

const FormComponent = () => {
  const page = "";
  const limit = "";
  const search = "";

  const { data: homebase } = useGetHomebasesQuery();
  const { data: rowData1 = {} } = useGetClassesQuery({ page, limit, search });
  const { classes = [] } = rowData1;
  const { data: rowData = {} } = useGetSubjectsQuery({ page, limit, search });
  const { subjects = [] } = rowData;
  const [createTeacher, { data, isSuccess, isLoading, error, reset }] =
    useCreateTeacherMutation();

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

  const submitHandler = (e) => {
    e.preventDefault();

    const data = { nip, name, subjectCodes, homeIds, homeroom, classCode };

    createTeacher(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

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
          onChange={(e) => setHomeroom(e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Pilih Wali Kelas
          </option>
          <option value="1">Ya</option>
          <option value="2">Tidak</option>
        </select>

        {homeroom === "1" && (
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
              <input type="file" name="file" className="form-control" />

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
