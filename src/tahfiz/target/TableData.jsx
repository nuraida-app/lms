import React, { Fragment, useState } from "react";
import TableContainer from "../../components/tabel/TabelContainer";
import { useGetTargetsQuery } from "../../control/api/scoreApi";

const TableData = () => {
  const { data: targets } = useGetTargetsQuery();

  return (
    <div className='table-responsive mt-2 bg-white shadow p-2 rounded border border-2'>
      <table className='table table-bordered  table-hover'>
        <thead>
          <tr>
            <th className='text-center'>Tingkat</th>
            <th className='text-center'>Juz</th>
            <th className='text-center'>Ayat</th>
            <th className='text-center'>Baris</th>
            <th className='text-center'>Total Ayat</th>
            <th className='text-center'>Total Baris</th>
            <th className='text-center'>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {targets?.length > 0 ? (
            targets?.map((item, index) => (
              <Fragment key={index}>
                {item.target.map((targetItem, targetIndex) => (
                  <tr key={targetIndex}>
                    {targetIndex === 0 && (
                      <th
                        rowSpan={item.target.length}
                        className='text-center align-middle'
                      >
                        {item.grade}
                      </th>
                    )}
                    <td className='text-center'>{targetItem.juz}</td>
                    <td className='text-center'>{targetItem.total_ayat}</td>
                    <td className='text-center'>{targetItem.total_line}</td>
                    {targetIndex === 0 && (
                      <td
                        rowSpan={item.target.length}
                        className='text-center align-middle'
                      >
                        {item.total_ayat}
                      </td>
                    )}
                    {targetIndex === 0 && (
                      <td
                        rowSpan={item.target.length}
                        className='text-center align-middle'
                      >
                        {item.total_line}
                      </td>
                    )}
                    <td className='text-center'>
                      <button className='btn btn-sm btn-danger'>Hapus</button>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='text-center'>
                Tidak ada data tersedia
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
