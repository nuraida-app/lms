import React from "react";
import Layout from "../components/Layout";
import TableContainer from "../../components/tabel/TabelContainer";
import Addbank from "./forms/Addbank";
import { useNavigate } from "react-router-dom";

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
  { label: "Nama Guru" },
  { label: "Nama Bank Soal" },
  { label: "Tingkat" },
  { label: "PG" },
  { label: "Essay" },

  { label: "Aksi" },
];

const CbtBankList = () => {
  const navigate = useNavigate();

  const goToLink = (id) => navigate(`/cbt-bank-soal/${id}/soal`);
  return (
    <Layout>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <Addbank />
        </div>
        <div
          className="col-lg-9 cool-12"
          style={{ maxHeight: "calc(100vh - 70px)", overflow: "auto" }}
        >
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
                    <td>{user.last}</td>
                    <td>{user.last}</td>
                    <td>{user.last}</td>

                    <td>
                      <div className="d-flex flex-column justify-content-center gap-2">
                        <button
                          className="btn btn-success"
                          onClick={() => goToLink(index)}
                        >
                          + Tambah Soal
                        </button>
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

export default CbtBankList;
