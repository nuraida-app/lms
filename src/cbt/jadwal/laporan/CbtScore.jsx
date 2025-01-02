import React from "react";
import TableContainer from "../../../components/tabel/TabelContainer";

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
  { label: "NIS" },
  { label: "Nama Siswa" },
  { label: "Kelas" },
  { label: "Pilihan Ganda" },
  { label: "Uraian" },
  { label: "Nilai" },
];

const CbtScore = ({ tableRef }) => {
  return (
    <TableContainer>
      <table ref={tableRef} className="table table-striped table-hover">
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
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default CbtScore;
