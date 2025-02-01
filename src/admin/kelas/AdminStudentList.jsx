import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import TableContainer from "../../components/tabel/TabelContainer";
import AddStudent from "./AddStudent";
import { data, useParams } from "react-router-dom";
import {
  useClearClassMutation,
  useGetStudentsQuery,
  useRemoveStudentFromClassMutation,
} from "../../control/api/studentApi";
import BtnLoader from "../../components/loader/BtnLoader";
import { toast } from "react-toastify";
import { useGetDatabaseQuery } from "../../control/api/dbApi";

const columns = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama" },
  { label: "Tingkat" },
  { label: "Kelas" },
  { label: "Database" },
  { label: "Aksi" },
];

const AdminStudentList = () => {
  const params = useParams();
  const classCode = params.code;
  const name = params.name;
  const homebase = "";
  const gradeId = "";

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data: rowData = {} } = useGetStudentsQuery({
    homebase,
    gradeId,
    classCode,
    page,
    limit,
    search,
  });
  const { students = [], totalPages, totalStudents } = rowData;
  const { data: rawData = {} } = useGetDatabaseQuery({
    page,
    limit,
    search,
    classCode,
  });

  const { database = [], totalPages: pages } = rawData;

  const [
    removeStudentFromClass,
    { data: message, isSuccess, isLoading, error },
  ] = useRemoveStudentFromClassMutation();
  const [clearClass] = useClearClassMutation();

  const deleteHandler = (id) => {
    removeStudentFromClass(id);
  };

  const clear = () => clearClass(classCode);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [message, isSuccess, error]);

  return (
    <Layout title={`Kelas ${name}`}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <AddStudent />
        </div>

        <div className="col-lg-9 col-12">
          <TableContainer
            page={page}
            setPage={(e) => setPage(e)}
            setLimit={(e) => setLimit(e)}
            onValue={(e) => setSearch(e)}
            totalPages={totalPages}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className="h6 m-0">
                Jumlah Siswa: <span>{totalStudents}</span>
              </p>

              <button className="btn btn-danger" onClick={clear}>
                Hapus Semua
              </button>
            </div>
            <table className="table table-striped table-hover mt-2">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.label} scope="col" className="text-center">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students?.map((student, index) => {
                  const result = database?.find(
                    (data) => data.nis === student.nis
                  )?.kelengkapan;

                  console.log(result);
                  return (
                    <tr key={student.id}>
                      <th scope="row" className="text-center align-middle">
                        {index + 1}
                      </th>
                      <td className="text-center align-middle">
                        {student.nis}
                      </td>
                      <td className="align-middle">{student.name}</td>
                      <td className="text-center align-middle">
                        {student.grade}
                      </td>
                      <td className="text-center align-middle">
                        {student.class}
                      </td>
                      <td className="text-center align-middle">
                        <div className="progress" style={{ width: "100%" }}>
                          <div
                            className="progress-bar shadow"
                            role="progressbar"
                            style={{
                              width: `${result ? result : 0}%`,
                            }}
                            aria-valuenow={result ? result : 0}
                            aria-valuemin="0"
                            aria-valuemax={100}
                          >
                            {`${result ? result : 0}%`}
                          </div>
                        </div>
                      </td>
                      <td>
                        {isLoading ? (
                          <BtnLoader />
                        ) : (
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteHandler(student.id)}
                            >
                              Hapus
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableContainer>
        </div>
      </div>
    </Layout>
  );
};

export default AdminStudentList;
