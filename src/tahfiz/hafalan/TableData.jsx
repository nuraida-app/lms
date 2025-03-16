import React from "react";

const TableData = ({ data, deleteSurah }) => {
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
            <th className="text-center">Hapus</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((item, i) => (
              <tr key={i}>
                <td className="text-center align-middle">
                  {item.fromSurahName}
                </td>
                <td className="text-center align-middle">{item.fromAyat}</td>
                <td className="text-center align-middle">{item.toAyat}</td>
                <td className="text-center align-middle">{item.fromLine}</td>
                <td className="text-center align-middle">{item.toLine}</td>
                <td className="text-center align-middle">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteSurah(item.fromSurahName)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>Data belum tersedia</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
