import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import {
  useGetCategoriesQuery,
  useGetTypesQuery,
} from "../../control/api/metricApi";
import { useGetExaminersQuery } from "../../control/api/examinerApi";
import { useGetQuranQuery } from "../../control/api/quranApi";

const ReportDetail = () => {
  const params = useParams();
  const [student, setStudent] = useState("");
  const [search, setSearch] = useState();
  const [typeId, setTypeId] = useState("");
  const [examiner, setExaminer] = useState("");

  const [fromSurah, setFromSurah] = useState("");
  const [fromAyat, setFromAyat] = useState("");
  const [toSurah, setToSurah] = useState("");
  const [toAyat, setToAyat] = useState("");
  const [tableData, setTableData] = useState([]);
  const [report, setReport] = useState(null);

  const { data: types } = useGetTypesQuery();
  const { data: examiners } = useGetExaminersQuery({ search });
  const { data: surahs } = useGetQuranQuery({ search });
  const { data: categories } = useGetCategoriesQuery();

  const getAyatOptions = (surahId) => {
    const selectedSurah = surahs?.find(
      (surah) => surah.id === parseInt(surahId)
    );
    return selectedSurah
      ? Array.from({ length: selectedSurah.ayat }, (_, i) => i + 1)
      : [];
  };

  const handleAddToTable = () => {
    if (fromSurah && fromAyat && toSurah && toAyat) {
      const fromSurahName =
        surahs.find((surah) => surah.id === parseInt(fromSurah))?.name || "";
      const toSurahName =
        surahs.find((surah) => surah.id === parseInt(toSurah))?.name || "";

      setTableData((prev) => [
        ...prev,
        { fromSurah, fromSurahName, fromAyat, toSurah, toSurahName, toAyat },
      ]);

      setFromSurah("");
      setFromAyat("");
      setToSurah("");
      setToAyat("");
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("report"));

    if (data) {
      setStudent(data.name);
      setTypeId(data.type_id);
      setExaminer(data.examiner_id);
      setTableData(data.surahs);
      setReport(data);
    }
  }, []);

  return (
    <Layout title={`laporan ${params.name.replace("-", " ")}`}>
      <div className="d-flex flex-column gap-2">
        <p className="m-0 h5 bg-white p-2 border shadow rounded">{student}</p>

        <div className="d-flex justify-content-between gap-2">
          <select
            name="type"
            id="1"
            className="form-select shadow"
            value={typeId || ""}
            onChange={(e) => setTypeId(e.target.value)}
          >
            <option value="" hidden>
              Pilih Jenis Penilaian
            </option>

            {types?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            name="type"
            id="1"
            className="form-select shadow"
            value={examiner || ""}
            onChange={(e) => setExaminer(e.target.value)}
          >
            <option value="" hidden>
              Pilih Penguji
            </option>

            {examiners?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="p-2 rounded border bg-white shadow">
          <div className="row g-2 ">
            <div className="col-md-3 col-12">
              <select
                className="form-select"
                value={fromSurah}
                onChange={(e) => setFromSurah(e.target.value)}
              >
                <option value="" hidden>
                  Dari Surah
                </option>
                {surahs?.map((surah) => (
                  <option key={surah.id} value={surah.id}>
                    {surah.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3 col-12">
              <select
                className="form-select"
                value={fromAyat}
                onChange={(e) => setFromAyat(e.target.value)}
                disabled={!fromSurah}
              >
                <option value="" hidden>
                  Dari Ayat
                </option>
                {getAyatOptions(fromSurah).map((ayat) => (
                  <option key={ayat} value={ayat}>
                    {ayat}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 col-12">
              <select
                className="form-select"
                value={toAyat}
                onChange={(e) => setToAyat(e.target.value)}
                disabled={!fromSurah}
              >
                <option value="" hidden>
                  Sampai Ayat
                </option>
                {getAyatOptions(fromSurah).map((ayat) => (
                  <option key={ayat} value={ayat}>
                    {ayat}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 col-12">
              <button
                className="btn btn-primary"
                disabled={!fromSurah ? true : false}
                onClick={handleAddToTable}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>

        <div className="row g-2">
          <div className="col-md-8 col-12">
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

          <div className="col-md-4 col-12">
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
