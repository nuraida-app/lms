import { useState } from "react";
import TableContainer from "../../components/tabel/TabelContainer";
import { useGetProgressQuery } from "../../control/api/reportApi";

const columns = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama Siswa" },
  { label: "Tingkat" },
  { label: "Kelas" },
  { label: "Capaian" },
];

const TableData = ({ juzId }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data: rawData = {} } = useGetProgressQuery(
    { page, limit, search, juzId },
    { skip: !juzId }
  );

  const { result = [], totalData, totalPages } = rawData;

  // Clear result if juzId is empty
  const clearedResult = juzId ? result : [];

  return (
    <TableContainer
      page={page}
      setPage={setPage}
      setLimit={setLimit}
      onValue={setSearch}
      totalPages={totalPages}
    >
      <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr>
            {columns?.map((item) => (
              <th key={item.label} className='text-center'>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clearedResult.length > 0 ? (
            clearedResult.map((item, index) => (
              <tr key={index}>
                <td className='text-center'>
                  {(page - 1) * limit + index + 1}
                </td>
                <td className='text-center'>{item.nis}</td>
                <td>{item.name}</td>
                <td className='text-center'>{item.grade}</td>
                <td className='text-center'>{item.class}</td>
                <td className='text-center'>
                  <div
                    className='progress'
                    role='progressbar'
                    aria-label='Example with label'
                    aria-valuenow={parseFloat(item.percentage)}
                    aria-valuemin='0'
                    aria-valuemax='100'
                  >
                    <div
                      className={`progress-bar ${
                        parseFloat(item.percentage) > 80
                          ? "bg-success"
                          : parseFloat(item.percentage) > 30
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                      style={{ width: `${parseFloat(item.percentage)}%` }}
                    >
                      {item.percentage}
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className='text-center'>
                {juzId
                  ? "No data available."
                  : "Pilih Juz untuk menampilkan data"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default TableData;
