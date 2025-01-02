import React from "react";
import Layout from "../components/layout/Layout";
import TableContainer from "../../components/tabel/TabelContainer";

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
  { label: "Kelas" },
  { label: "Database" },
  { label: "Aksi" },
];

const AdminStudents = () => {
  return (
    <Layout>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-12">
          <TableContainer>
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
                {usersData.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row" className="text-center">
                      {index + 1}
                    </th>
                    <td>{user.first}</td>
                    <td>{user.last}</td>
                    <td>{user.last}</td>
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
