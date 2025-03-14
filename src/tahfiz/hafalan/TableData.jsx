import React from "react";

const TableData = ({ data }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th className="text-center">Nama Surat</th>
            <th className="text-center">Dari Ayat</th>
            <th className="text-center">Sampai Ayat</th>
            <th className="text-center">Dari Baris</th>
            <th className="text-center">Sampai Baris</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((item, i) => (
              <tr key={i}>
                <td className="text-center">{item.fromSurahName}</td>
                <td className="text-center">{item.fromAyat}</td>
                <td className="text-center">{item.toAyat}</td>
                <td className="text-center">{item.fromLine}</td>
                <td className="text-center">{item.toLine}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Data belum tersedia</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
