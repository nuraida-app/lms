import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import FormComponent from "./FormComponent";
import TableContainer from "../../components/tabel/TabelContainer";
import { useGetTeachersQuery } from "../../control/api/teacherApi";
import { toast } from "react-toastify";

const colums = [
  { label: "No" },
  { label: "Satuan" },
  { label: "NIP" },
  { label: "Nama" },
  { label: "Mapel" },
  { label: "Wali Kelas" },
  { label: "Kelas" },
];
const AdminTeacher = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data: rawData = {} } = useGetTeachersQuery({ page, limit, search });
  const { teachers = [], totalPages, total } = rawData;

  return (
    <Layout title={"Daftar Guru"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-12">
          <TableContainer
            page={page}
            setLimit={(e) => setLimit(e)}
            setPage={(e) => setPage(e)}
            onValue={(e) => setSearch(e)}
            totalPages={totalPages}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className="m-0 h6">
                Jumlah Guru <span>{total}</span>
              </p>

              <button className="btn btn-danger">Hapus Data</button>
            </div>
            <table className="table table-striped table-hover mt-2">
              <thead>
                <tr>
                  {colums?.map((column, index) => (
                    <th key={index} scope="col" className="text-center">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index}>
                    <th scope="row" className="align-middle text-center">
                      {(page - 1) * limit + index + 1}
                    </th>
                    <td className="align-middle text-center">
                      {teacher.homebase_name}
                    </td>
                    <td className="align-middle text-center">{teacher.nip}</td>
                    <td className="align-middle">{teacher.name}</td>
                    <td className="align-middle">
                      {[
                        ...new Set(
                          teacher.subjects.map((subject) => subject.subject)
                        ),
                      ]?.map((subjectName, index) => (
                        <p key={`${teacher.id}-${index}`} className="m-0">
                          {subjectName}
                        </p>
                      ))}
                    </td>
                    <td className="align-middle text-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={teacher.homeroom === 1 ? "checked" : null}
                        readOnly
                      />
                    </td>
                    <td className="align-middle text-center">
                      {teacher.class}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </div>
      </div>
    </Layout>
  );
};

export default AdminTeacher;
