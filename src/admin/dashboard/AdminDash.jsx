import React from "react";
import Layout from "../components/layout/Layout";
import Data1 from "./Data1";
import TableContainer from "../../components/tabel/TabelContainer";
import { useAdminDashboardQuery } from "../../control/api/adminApi";

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
  { label: "Nama Lengkap" },
  { label: "Tingkat" },
  { label: "kelas" },
  { label: "Kelengkapan" },
];

const AdminDash = () => {
  const { data } = useAdminDashboardQuery();

  return (
    <Layout title={"Admin Dashboard"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-2 col-12">
          <Data1 data={data} />
        </div>
        <div className="col-lg-10 col-12">
          <p className="m-0 h5">Kelengkapan Database Peserta Didik</p>
          <TableContainer>
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
                {usersData.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row" className="text-center">
                      {index + 1}
                    </th>
                    <td>{user.first}</td>
                    <td>{user.last}</td>
                    <td>{user.handle}</td>
                    <td>
                      <div className="progress" style={{ width: "100%" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `70%`,
                          }}
                          aria-valuenow={70}
                          aria-valuemin="0"
                          aria-valuemax={100}
                        >
                          {70}
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
