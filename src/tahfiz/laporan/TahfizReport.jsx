import React, { Fragment, useEffect, useState } from "react";
import Layout from "../components/Layout";
import TableContainer from "../../components/tabel/TabelContainer";
import {
  useDeleteReportMutation,
  useGetReportQuery,
} from "../../control/api/reportApi";
import { useNavigate } from "react-router-dom";
import { useGetTypesQuery } from "../../control/api/metricApi";
import { toast } from "react-toastify";

const TahfizReport = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const { data: rawData = {}, isLoading } = useGetReportQuery({
    page,
    limit,
    search,
    type,
  });
  const { report = [], totalPages, totalData } = rawData;
  const { data: types } = useGetTypesQuery();
  const [
    deleteReport,
    { data, isSuccess, isLoading: delLoading, error, reset },
  ] = useDeleteReportMutation();

  const goToLink = (detail) => {
    localStorage.setItem("report", JSON.stringify(detail));

    const formatted = detail.name.replace(/\s+/g, "-");

    navigate(`/tahfiz-laporan/${detail.nis}/${formatted}`);
  };

  const deleteHandler = (nis, type, date) => {
    deleteReport({ nis, typeId: type, createdat: date });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
      console.log(error);
    }
  }, [data, isSuccess, error]);

  return (
    <Layout title={"Laporan"}>
      <div className="d-flex justify-content-end gap-2 p-2 rounded border shadow">
        <button className="btn btn-secondary" onClick={() => setType("")}>
          Reset
        </button>
        {types?.map((item) => (
          <button
            key={item.id}
            className="btn btn-secondary"
            onClick={() => setType(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <TableContainer
        page={page}
        setPage={(e) => setPage(e)}
        setLimit={(e) => setLimit(e)}
        onValue={(e) => setSearch(e)}
        totalPages={totalPages}
      >
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th className="align-middle text-center">No</th>
              <th className="align-middle text-center">Tanggal</th>
              <th className="align-middle text-center">NIS</th>
              <th className="align-middle text-center">Nama Siswa</th>
              <th className="align-middle text-center">Tingkat</th>
              <th className="align-middle text-center">Kelas</th>
              <th className="align-middle text-center">Jenis Penilaian</th>
              <th className="align-middle text-center">Surah</th>
              <th className="align-middle text-center">Nilai</th>
              <th className="align-middle text-center">Penguji</th>
              <th className="align-middle text-center">Aksi</th>
            </tr>
          </thead>
          {report?.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={11}>Belum ada data</td>
              </tr>
            </tbody>
          ) : isLoading ? (
            <tbody>
              <tr>
                <td>Loading..</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {report?.map((data, index) => (
                <tr key={index}>
                  <td className="text-center align-middle">{index + 1}</td>
                  <td className="text-center align-middle">
                    {new Date(data.date).toLocaleDateString()}
                  </td>
                  <td className="text-center align-middle">{data.nis}</td>
                  <td className="text-start align-middle">{data.name}</td>
                  <td className="text-center align-middle">{data.grade}</td>
                  <td className="text-center align-middle">{data.class}</td>
                  <td className="text-center align-middle">{data.type}</td>
                  <td className="text-center align-middle">
                    {data.surahs?.map((item, i) => (
                      <p key={i} className="m-0">
                        {item.name}{" "}
                        <span>{`(${item.from_ayat} - ${item.to_ayat})`}</span>
                      </p>
                    ))}
                  </td>

                  <td className="text-center align-middle">
                    {data.totalPoints}
                  </td>
                  <td className="text-center align-middle">{data.examiner}</td>
                  <td className="align-middle">
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => goToLink(data)}
                      >
                        Detail
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          deleteHandler(
                            data.nis,
                            data.type_id,
                            new Date(data.date).toLocaleDateString()
                          )
                        }
                      >
                        {delLoading ? `Loading...` : `Hapus`}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </TableContainer>
    </Layout>
  );
};

export default TahfizReport;
