import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Data1 from "./Data1";
import TableContainer from "../../components/tabel/TabelContainer";
import { useAdminDashboardQuery } from "../../control/api/adminApi";
import { useGetDatabaseQuery } from "../../control/api/dbApi";

const usersData = [
  { id: 1, first: "Mark", last: "Otto", handle: "@mdo" },
  { id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
  { id: 3, first: "Larry", last: "Bird", handle: "@twitter" },
  { id: 4, first: "John", last: "Doe", handle: "@jdoe" },
  { id: 5, first: "Jane", last: "Smith", handle: "@jsmith" },
  { id: 6, first: "Chris", last: "Evans", handle: "@cevans" },
  { id: 7, first: "Emily", last: "Clark", handle: "@eclark" },
  { id: 8, first: "Michael", last: "Scott", handle: "@mscott" },
  { id: 9, first: "Pam", last: "Beesly", handle: "@pbeesly" },
  { id: 10, first: "Dwight", last: "Schrute", handle: "@dschrute" },
];

const columns = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama Lengkap" },
  { label: "Tingkat" },
  { label: "Kelas" },
  { label: "Kelengkapan" },
];

const AdminDash = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState();
  const classCode = "";

  const { data } = useAdminDashboardQuery();
  const { data: rawData = {} } = useGetDatabaseQuery({
    page,
    limit,
    search,
    classCode,
  });
  const { database = [], totalPages, totalData } = rawData;

  return (
    <Layout title={"Admin Dashboard"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-2 col-12">
          <Data1 data={data} />
        </div>
        <div className="col-lg-10 col-12">
          <p className="m-0 h5 p-2 rounded border shadow bg-white">
            Kelengkapan Database Peserta Didik
          </p>
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
                    <th scope="row" className="text-center">
                      {(page - 1) * limit + index + 1}
                    </th>
                    <td className="text-center align-middle">{user.nis}</td>
                    <td className="align-middle">{user.nama_lengkap}</td>
                    <td className="text-center align-middle">{user.tingkat}</td>
                    <td className="text-center align-middle">{user.kelas}</td>
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

export default AdminDash;
