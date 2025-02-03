import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import TableContainer from "./TabelContainer";
import { useGetDatabaseQuery } from "../../control/api/dbApi";
import { useUpdateStudentMutation } from "../../control/api/studentApi";
import { toast } from "react-toastify";

const columns = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama Lengkap" },
  { label: "Tingkat" },
  { label: "Kelas" },
  { label: "Status" },
  { label: "Kelengkapan" },
  { label: "Aksi" },
];

const CenterDb = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const classCode = "";
  const [student, setStudent] = useState({});
  const [nis, setNis] = useState("");
  const [name, setName] = useState("");

  const { data: rawData = {}, refetch } = useGetDatabaseQuery({
    page,
    limit,
    search,
    classCode,
  });
  const { database = [], totalPages, totalData } = rawData;
  const [updateStudent, { data, isSuccess, isLoading, error, reset }] =
    useUpdateStudentMutation();

  const editHandler = () => {
    const data = { nis, name };

    updateStudent({ id: student.id, body: data });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      refetch();
      setStudent({});
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (student) {
      setNis(student.nis);
      setName(student.nama_lengkap);
    }
  }, [student]);
  return (
    <Layout title={"Database Pusat"}>
      <TableContainer
        page={page}
        setPage={(e) => setPage(e)}
        setLimit={(e) => setLimit(e)}
        onValue={(e) => setSearch(e)}
        totalPages={totalPages}
      >
        <table className="table table-striped table-hover mt-2">
          <thead>
            <tr>
              {columns.map((column, i) => (
                <th key={i} scope="col" className="text-center">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {database?.map((user, index) => (
              <tr key={index}>
                <th scope="row" className="text-center align-middle">
                  {(page - 1) * limit + index + 1}
                </th>
                <td className="text-center align-middle">{user.nis}</td>
                <td className=" align-middle">{user.nama_lengkap}</td>
                <td className="text-center align-middle">{user.tingkat}</td>
                <td className="text-center align-middle">{user.kelas}</td>
                <td className="text-center align-middle">
                  {user.status ? (
                    <div className="d-flex gap-2 align-items-center justify-content-center">
                      <div
                        className="rounded-circle bg-success"
                        style={{ height: 10, width: 10 }}
                      ></div>
                      <p className="m-0">Aktif</p>
                    </div>
                  ) : (
                    <div className="d-flex gap-2 align-items-center justify-content-center">
                      <div
                        className="rounded-circle bg-danger"
                        style={{ height: 10, width: 10 }}
                      ></div>
                      <p className="m-0">off</p>
                    </div>
                  )}
                </td>
                <td className="text-center align-middle">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${user.kelengkapan}%`,
                      }}
                      aria-valuenow={user.kelengkapan}
                      aria-valuemin="0"
                      aria-valuemax={100}
                    >
                      {`${user.kelengkapan}%`}
                    </div>
                  </div>
                </td>
                <td className="text-center align-middle">
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#edit"
                      onClick={() => setStudent(user)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      <div
        className="modal fade"
        id="edit"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Edit Data Siswa</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" className="d-flex flex-column gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="NIS"
                  name="nis"
                  value={nis || ""}
                  onChange={(e) => setNis(e.target.value)}
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Lengkap"
                  name="name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setStudent({})}
              >
                Tutup
              </button>
              <button
                type="buttin"
                className="btn btn-success"
                onClick={editHandler}
                disabled={isLoading ? true : false}
              >
                {isLoading ? "Loading..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CenterDb;
