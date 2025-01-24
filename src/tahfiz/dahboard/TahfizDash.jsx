import React, { useState } from "react";
import Layout from "../components/Layout";
import { useGetStudentsQuery } from "../../control/api/scoreApi";
import TableContainer from "../../components/tabel/TabelContainer";
import Scoring from "./Scoring";

const columns = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama Lengkap" },
  { label: "Tingkat" },
  { label: "Kelas" },
  { label: "Aksi" },
];

const TahfizDash = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const [student, setStudent] = useState({});

  const { data: rawData = {} } = useGetStudentsQuery({ page, limit, search });
  const { students = [], totalPages, totalData } = rawData;

  return (
    <Layout title={"Administrator Tahfiz"}>
      <div style={{ height: "calc(100vh - 70px)", overflow: "auto" }}>
        <TableContainer
          page={page}
          setPage={(e) => setPage(e)}
          setLimit={(e) => setLimit(e)}
          onValue={(e) => setSearch(e)}
          totalPages={totalPages}
        >
          <p className="m-0 h6 mx-2">
            Total Siswa <span>{totalData}</span>
          </p>
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
                  <td className="text-center align--middle">
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#nilai"
                      onClick={() => setStudent(user)}
                    >
                      Nilai
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>

        <Scoring student={student} />
      </div>
    </Layout>
  );
};

export default TahfizDash;
