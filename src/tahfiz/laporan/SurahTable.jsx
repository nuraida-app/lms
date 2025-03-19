import React, { useState } from "react";

const SurahTable = ({ data }) => {
  const [page, setPage] = useState(1);
  const limit = 13;

  // Calculate the start and end index for slicing the data
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / limit);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(totalPages, page + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
          <button className='page-link' onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    return buttons;
  };

  return (
    <div className='table-responsive border border-2 rounded p-1 bg-white shadow'>
      <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr>
            <th className='text-center'>Surah</th>
            <th className='text-center'>Dari Ayat</th>
            <th className='text-center'>Sampai Ayat</th>
            <th className='text-center'>Dari Baris</th>
            <th className='text-center'>Sampai Baris</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td className='text-center'>{row.from_ayat}</td>
              <td className='text-center'>{row.to_ayat}</td>
              <td className='text-center'>{row.from_line}</td>
              <td className='text-center'>{row.to_line}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className='d-flex justify-content-between'>
        <ul className='pagination pagination-sm'>
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className='page-link'
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <i className='bi bi-chevron-double-left'></i>
            </button>
          </li>
          {getPaginationButtons()}
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              className='page-link'
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              <i className='bi bi-chevron-double-right'></i>
            </button>
          </li>
        </ul>

        <p>
          Total Data <span>{data?.length}</span>
        </p>
      </nav>
    </div>
  );
};

export default SurahTable;
