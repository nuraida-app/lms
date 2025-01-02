import React from "react";
import Layout from "../components/Layout";
import TableContainer from "../../components/tabel/TabelContainer";
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
  { label: "Nama Guru" },
  { label: "Nama Ujian" },
  { label: "Nama Bank Soal" },
  { label: "Tingkat" },
  { label: "Status" },
  { label: "Keterangan" },
  { label: "Token" },
  { label: "Jadwal" },
  { label: "Aksi" },
];

const CbtSchedules = () => {
  const navigate = useNavigate();

  const goToLink = (bankName, bankId, gradeId) =>
    navigate(`/cbt-laporan/${bankName}/${bankId}/${gradeId}`);
  return (
    <Layout>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-12 d-flex flex-column gap-2">
          <div className="container-fluid text-end p-2 rounded shadow">
            <button className="btn btn-success mx-2">+ Tambah</button>
            <button className="btn btn-danger">- Hapus</button>
          </div>

          <div
            style={{
              height: "calc(100vh - 150px)",
              overflow: "auto",
            }}
            className="rounded shadow"
          >
            <TableContainer>
              <table className="table table-striped table-hover">
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
                      <td>{user.first}</td>
                      <td>{user.first}</td>
                      <td>{user.last}</td>
                      <td>{user.last}</td>
                      <td>{user.last}</td>
                      <td>{user.last}</td>
                      <td>{user.last}</td>
                      <td>{user.last}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => goToLink("Contoh bank soal", 50, 25)}
                          >
                            Detail
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
      </div>
    </Layout>
  );
};

export default CbtSchedules;
