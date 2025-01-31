import React, { useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import TableContainer from "../../components/tabel/TabelContainer";
import { useStudentReportQuery } from "../../control/api/reportApi";
import { useGetCategoriesQuery } from "../../control/api/metricApi";

const TahfizStudent = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [detail, setDetail] = useState({});

  const { name, nis } = params;
  const formatted = name.replace(/-/g, " ");

  const { data: rawData = {}, isLoading } = useStudentReportQuery(nis, {
    skip: !nis,
  });
  const { report = [], totalPages } = rawData;
  const { data: categories } = useGetCategoriesQuery();

  return (
    <Layout title={`Laporan Tahfiz ${formatted}`}>
      <p className="m-0 h5 p-2 rounded border shadow bg-white">{formatted}</p>
      <TableContainer
        page={page}
        setPage={(e) => setPage(e)}
        setLimit={(e) => setLimit(e)}
        totalPages={totalPages}
      >
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="align-middle text-center">No</th>
              <th className="align-middle text-center">Tanggal</th>
              <th className="align-middle text-center">Penguji</th>
              <th className="align-middle text-center">Jenis Penilaian</th>
              <th className="align-middle text-center">Surah</th>
              <th className="align-middle text-center">Nilai</th>
              <th className="align-middle text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {report?.map((item, i) => (
              <tr key={i}>
                <td className="align-middle text-center">
                  {(page - 1) * limit + i + 1}
                </td>
                <td className="align-middle text-center">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="align-middle">{item.examiner}</td>
                <td className="align-middle">{item.type}</td>
                <td className="align-middle">
                  {item.surahs?.map((surah) => (
                    <p
                      className="m-0"
                      key={surah.id}
                    >{`${surah.name} (${surah.from_ayat} -  ${surah.to_ayat})`}</p>
                  ))}
                </td>
                <td className="align-middle text-center">{item.totalPoints}</td>

                <td className="align-middle text-center">
                  <button
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#detail"
                    onClick={() => setDetail(item)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      <div
        className="modal fade"
        id="detail"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {detail?.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="table-responsive border border-2 p-1 rounded bg-white shadow">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Kategori</th>
                      <th>Indikator</th>
                      <th>Poin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((category, i) => (
                      <tr key={i}>
                        {/* Nama Kategori */}
                        <td className="align-middle">{category.category}</td>

                        {/* Indikator */}
                        <td className="align-middle">
                          <div className="d-flex flex-column gap-2">
                            {Array.isArray(category.indicators) &&
                            category.indicators.filter((indi) => indi !== null)
                              .length > 0 ? (
                              category.indicators
                                .filter((indi) => indi !== null)
                                .map((indi, j) => {
                                  // Ambil poin berdasarkan category_id dan indicator_id
                                  const score = detail?.scores?.find(
                                    (score) =>
                                      score.category_id === category.id &&
                                      score.indicators.some(
                                        (indicator) =>
                                          indicator.indicator_id === indi.id
                                      )
                                  );

                                  const indicatorPoint = score?.indicators.find(
                                    (indicator) =>
                                      indicator.indicator_id === indi.id
                                  )?.poin;

                                  return (
                                    <div
                                      key={j}
                                      className="d-flex align-items-center justify-content-between p-2 rounded border border-2 bg-white"
                                    >
                                      <p className="m-0">{indi.name}</p>
                                      <input
                                        style={{ width: 200 }}
                                        type="text"
                                        className="form-control"
                                        placeholder="Penilaian"
                                        value={indicatorPoint || ""}
                                        readOnly
                                        data-indicator-id={indi.id}
                                        data-category-id={category.id}
                                      />
                                    </div>
                                  );
                                })
                            ) : (
                              <p className="m-0 text-muted">
                                Tidak ada indikator untuk kategori ini
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Poin Kategori */}
                        <td className="align-middle">
                          <div className="d-flex justify-content-center">
                            <input
                              type="text"
                              name="category-score"
                              className="form-control"
                              placeholder="Nilai"
                              style={{ width: 80 }}
                              value={
                                detail?.scores?.find(
                                  (score) => score.category_id === category.id
                                )?.poin || ""
                              }
                              readOnly
                              data-category-id={category.id}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDetail({})}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TahfizStudent;
