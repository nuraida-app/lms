import React, { useState } from "react";
import { useGetDemographicQuery } from "../../control/api/dbApi";
import TableContainer from "../../components/tabel/TabelContainer";

const Chart = ({ type }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data: rawData = {} } = useGetDemographicQuery({
    page,
    limit,
    search,
  });

  const dataMap = {
    provinces: rawData.provinces || [],
    regencies: rawData.regencies || [],
    districts: rawData.districts || [],
    villages: rawData.villages || [],
  };

  const selectedData = dataMap[type];
  const totalPages = rawData.totalPages ? rawData.totalPages[type] : 1;
  const maxTotal = selectedData?.length
    ? Math.max(...selectedData.map((item) => item.total))
    : 1;

  return (
    <TableContainer
      page={page}
      setPage={(e) => setPage(e)}
      setLimit={(e) => setLimit(e)}
      onValue={(e) => setSearch(e)}
      totalPages={totalPages}
    >
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <td className="text-center align-middle">No</td>
            <td className="text-center align-middle">Nama</td>
            <td className="text-center align-middle">Data</td>
          </tr>
        </thead>
        <tbody>
          {selectedData?.map((item, i) => (
            <tr key={i}>
              <td className="text-center align-middle">
                {(page - 1) * limit + i + 1}
              </td>
              <td className="align-middle">{item.name}</td>
              <td className="text-center align-middle">
                <div
                  className="progress pointer"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`${item.total} Data`}
                  style={{ width: "100%" }}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${(item.total / maxTotal) * 100}%` }}
                    aria-valuenow={(item.total / maxTotal) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`${item.total} Data`}
                  >
                    {item.total}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default Chart;
