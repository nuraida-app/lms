import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import TableContainer from "./TabelContainer";
import { useGetDatabaseQuery } from "../../control/api/dbApi";

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

  const { data: rawData = {} } = useGetDatabaseQuery({
    page,
    limit,
    search,
    classCode,
  });
  const { database = [], totalPages, totalData } = rawData;

  console.log(database);

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
                    <button className="btn btn-warning">Edit</button>
                    <button className="btn btn-danger">Hapus</button>
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

export default CenterDb;
