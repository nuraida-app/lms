import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetStudentsQuery } from "../../control/api/studentApi";
import TableContainer from "../../components/tabel/TabelContainer";

const columns = [
  { label: "No" },
  { label: "Tahun Ajar" },
  { label: "NIS" },
  { label: "Nama Lengkap" },
  { label: "Tingkat" },
  { label: "Kelas" },
  { label: "Database" },
  { label: "Aksi" },
];

const TeacherDatabase = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const classCode = user?.class_code;

  const { data: rawData = {} } = useGetStudentsQuery({
    page,
    limit,
    search,
    classCode,
  });
  const { students = [], totalPages } = rawData;

  const goToLink = (name, nis) => {
    const formatted = name.replace(/\s+/g, "-");
    navigate(`/guru-database/${formatted}/${nis}`);
  };

  return (
    <Layout title={"Database"}>
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
                <td className="align-middle text-center">{user.year}</td>
                <td className="align-middle text-center">{user.nis}</td>
                <td className="align-middle">{user.name}</td>
                <td className="text-center align-middle">{user.grade}</td>
                <td className="text-center align-middle">{user.class}</td>
                <td className="text-center align-middle">
                  <div className="progress" style={{ width: "100%" }}>
                    <div
                      className="progress-bar shadow"
                      role="progressbar"
                      style={{
                        width: `${user.kelengkapan ? user.kelengkapan : 0}%`,
                      }}
                      aria-valuenow={user.kelengkapan}
                      aria-valuemin="0"
                      aria-valuemax={100}
                    >
                      {`${user.kelengkapan}%`}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => goToLink(user.name, user.nis)}
                    >
                      Detail
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </Layout>
  );
};

export default TeacherDatabase;
