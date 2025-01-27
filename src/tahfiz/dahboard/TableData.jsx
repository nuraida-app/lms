import React from "react";

const TableData = ({ tableData }) => (
  <div className="table-responsive border border-2 rounded p-1">
    <table className="table table-striped table-hover mt-3">
      <thead>
        <tr>
          <th>Dari Surah</th>
          <th>Dari Ayat</th>
          <th>Sampai Surah</th>
          <th>Sampai Ayat</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>{row.fromSurahName}</td>
            <td>{row.fromAyat}</td>
            <td>{row.toSurahName}</td>
            <td>{row.toAyat}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TableData;
