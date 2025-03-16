import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../control/api/metricApi";

const ReportDetail = () => {
  const params = useParams();
  const [student, setStudent] = useState("");
  const [type, setType] = useState("");
  const [examiner, setExaminer] = useState("");

  const [tableData, setTableData] = useState([]);
  const [report, setReport] = useState(null);

  const { data: categories } = useGetCategoriesQuery();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("report"));

    if (data) {
      setStudent(data.name);
      setType(data.type);
      setExaminer(data.examiner);
      setTableData(data.surahs);
      setReport(data);
    }
  }, []);

  return (
    <Layout title={`laporan ${params.name.replace("-", " ")}`}>
      <div className="d-flex flex-column gap-2">
        <div className="row g-2">
          <div className="col-lg-4 col-12">
            <p className="m-0 h5 bg-white p-2 border shadow rounded">
              {student}
            </p>
          </div>
          <div className="col-lg-4 col-12">
            <p className="m-0 h5 bg-white p-2 border shadow rounded">{type}</p>
          </div>
          <div className="col-lg-4 col-12">
            <p className="m-0 h5 bg-white p-2 border shadow rounded">
              {examiner}
            </p>
          </div>
        </div>

        <div className="row g-2">
          <div className="col-md-6 col-12">
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
                                const score = report?.scores?.find(
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
                              report?.scores?.find(
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

          <div className="col-md-6 col-12">
            <div className="table-responsive border border-2 rounded p-1 bg-white shadow">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Surah</th>
                    <th>Dari Ayat</th>
                    <th>Sampai Ayat</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.name}</td>
                      <td>{row.from_ayat}</td>
                      <td>{row.to_ayat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportDetail;
