import React, { useState } from "react";
import Layout from "../components/Layout";
import TableContainer from "../../components/tabel/TabelContainer";
import Classes from "./Classes";
import { useGetStudentsQuery } from "../../control/api/scoreApi";
import { useNavigate } from "react-router-dom";

const columns = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama Lengkap" },
  { label: "Tingkat" },
  { label: "Kelas" },
  { label: "Aksi" },
];

const TahfizAddMemo = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data: rawData = {} } = useGetStudentsQuery(
    { page, limit, search, code },
    { skip: !code }
  );

  const { students = [], totalPages, totalData } = rawData;

  const pageScoring = (nis, name) => {
    const formatted = name.replace(/\s+/g, "-");

    navigate(`/tahfiz-hafalan-siswa/${nis}/${formatted}`);
  };

  const goToPage = (nis, name) => {
    const formatted = name.replace(/\s+/g, "-");

    navigate(`/tahfiz-laporan-siswa/${nis}/${formatted}`);
  };

  return (
    <Layout title={"Hafalan"}>
      <Classes setCode={setCode} />

      {students?.length > 0 ? (
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
                  <td className="text-center align-middle">
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => pageScoring(user.nis, user.name)}
                      >
                        Nilai
                      </button>

                      <button
                        className="btn btn-info"
                        onClick={() => goToPage(user.nis, user.name)}
                      >
                        Laporan
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      ) : (
        <p className="p-2 border shadow bg-white rounded mt-2">
          Data Belum tersedia, silahkan piliih kelas terlebih dahulu
        </p>
      )}
    </Layout>
  );
};

export default TahfizAddMemo;
