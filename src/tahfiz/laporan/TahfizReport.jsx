import React from "react";
import Layout from "../components/Layout";
import TableContainer from "../../components/tabel/TabelContainer";
import { useGetCategoriesQuery } from "../../control/api/metricApi";

const TahfizReport = () => {
  const { data: categories } = useGetCategoriesQuery();
  const indicators = categories?.map((item) => item.indicators).flat();

  console.log(categories);
  return (
    <Layout title={"Laporan"}>
      <TableContainer>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th rowSpan={2} className="align-middle text-center">
                No
              </th>
              <th rowSpan={2} className="align-middle text-center">
                NIS
              </th>
              <th rowSpan={2} className="align-middle text-center">
                Nama Siswa
              </th>
              <th rowSpan={2} className="align-middle text-center">
                Tingkat
              </th>
              <th rowSpan={2} className="align-middle text-center">
                Kelas
              </th>
              {categories?.map((category) => {
                const indicatorCount = indicators?.filter(
                  (indi) => indi?.category_id === category.id
                )?.length;
                return (
                  <>
                    <th
                      key={category.id}
                      colSpan={indicatorCount || 1}
                      className="align-middle text-center"
                    >
                      {category.category}
                    </th>
                    <th rowSpan={2} className="align-middle text-center">
                      Poin
                    </th>
                  </>
                );
              })}
              <th rowSpan={2} className="align-middle text-center">
                Nilai
              </th>
            </tr>
            <tr>
              {categories?.map((category) => (
                <React.Fragment key={category.id}>
                  {indicators
                    ?.filter((indi) => indi?.category_id === category.id)
                    ?.map((indi) => (
                      <th key={indi.id} className="text-center">
                        {indi.name}
                      </th>
                    ))}
                  {indicators?.some(
                    (indi) => indi?.category_id === category.id
                  ) ? null : (
                    <th className="text-center"></th>
                  )}
                </React.Fragment>
              ))}
            </tr>
          </thead>
        </table>
      </TableContainer>
    </Layout>
  );
};

export default TahfizReport;

const result = [
  {
    nis: "Nis Siswa",
    name: "Nama Siswa",
    grade: "Tingkat Siswa",
    class: "Kelas siswa",
    socres: [
      {
        category_id: "id kategoru",
        category: "Nama Kategori",
        poin: "Nilai kategori yang memiliki indicator null",
        indicators: [
          {
            indicator_id: "id indicator",
            indicator: "Nama indicator",
            poin: "Nilai indikator",
          },
        ],
      },
    ],
    surahs: [
      {
        fromSurah: "Nama surah dari from_id",
        formAyat: "ayat dari surah from_count",
        toSurah: "nama surah dari to_id",
        toAyat: "ayat dari surah to_count",
      },
    ],
    totalScore: "Jumlah dari seluruh nilai kategori yang memilki null",
    type: "Jenis Penilaian",
    examiner: "Nama Penguji",
  },
];
