import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import TableContainer from "../../components/tabel/TabelContainer";
import { useSelector } from "react-redux";
import { useGetStudentsQuery } from "../../control/api/studentApi";

const columns = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama Lengkap" },
  { label: "Tingkat" },
  { label: "Kelas" },
  { label: "Database" },
  { label: "Aksi" },
];

const AdminStudents = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { user } = useSelector((state) => state.auth);

  const { data: rowData = {} } = useGetStudentsQuery(
    { homebase: user?.homebase_id, page, limit, search },
    { skip: !user?.homebase_id }
  );
  const { students = [], totalPages } = rowData;

  return (
    <Layout title={"Daftar Siswa"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-12">
          <TableContainer
            page={page}
            setPage={(e) => setPage(e)}
            setLimit={(e) => setLimit(e)}
            onValue={(e) => setSearch(e)}
            totalPages={totalPages}
          >
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  {columns.map((columns, i) => (
                    <th key={i} scope="col" className="text-center">
                      {columns.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students?.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row" className="text-center align-middle">
                      {(page - 1) * limit + index + 1}
                    </th>
                    <td className="align-middle text-center">{user.nis}</td>
                    <td className="align-middle">{user.name}</td>
                    <td className="text-center align-middle">{user.grade}</td>
                    <td className="text-center align-middle">{user.class}</td>
                    <td>{user.last}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-warning">Edit</button>
                        <button className="btn btn-danger">Hapus</button>
                      </div>
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

export default AdminStudents;
