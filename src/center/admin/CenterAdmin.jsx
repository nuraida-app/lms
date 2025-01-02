import React from "react";
import Layout from "../components/layout/Layout";
import FormComponent from "./FormComponent";
import TableContainer from "../../components/tabel/TabelContainer";

const usersData = [
  { id: 1, first: "Mark", last: "Otto", handle: "@mdo" },
  { id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
  { id: 3, first: "Larry", last: "Bird", handle: "@twitter" },
  { id: 4, first: "John", last: "Doe", handle: "@jdoe" },
  { id: 5, first: "Jane", last: "Smith", handle: "@jsmith" },
];

const columns = [
  { label: "No" },
  { label: "Nama Admin" },
  { label: "Level" },

  { label: "Aksi" },
];

const CenterAdmin = () => {
  return (
    <Layout>
      <div className="containter-fluid row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <FormComponent />
        </div>
        <div className="col-lg-9 col-12">
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

export default CenterAdmin;
