import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import FormComponent from "./FormComponent";
import TableContainer from "../../components/tabel/TabelContainer";
import {
  useDeleteSurahMutation,
  useGetQuranQuery,
} from "../../control/api/quranApi";
import { toast } from "react-toastify";

const columns = [
  { label: "No" },
  { label: "Nama Surat" },
  { label: "Jumlah Ayat" },
  { label: "Aksi" },
];

const TahfizAlquran = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState({});

  const { data: rawData = {} } = useGetQuranQuery({ page, limit, search });
  const { surah = [], totalPages, totalSurah, totalAyat } = rawData;
  const [deleteSurah, { data, isSuccess, isLoading, error, reset }] =
    useDeleteSurahMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);

      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  return (
    <Layout title={"Index Al Qur`an"}>
      <div className="row">
        <div className="col-md-3 col-12">
          <FormComponent surah={detail} clear={() => setDetail({})} />
        </div>
        <div className="col-md-9 col-12">
          <TableContainer
            page={page}
            setPage={(e) => setPage(e)}
            setLimit={(e) => setLimit(e)}
            onValue={(e) => setSearch(e)}
            totalPages={totalPages}
          >
            <div className="d-flex justify-content-between mx-2">
              <p className="m-0 h6">
                Total Surah <span>{totalSurah}</span>
              </p>
              <p className="m-0 h6">
                Total Ayat <span>{totalAyat}</span>
              </p>
            </div>
            <table className="table table-striped table-hover mt-2">
              <thead>
                <tr>
                  {columns?.map((column) => (
                    <th key={column.label} scope="col" className="text-center">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {surah?.map((item, index) => (
                  <tr key={index}>
                    <td className="align-middle text-center">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="align-middle">{item.surah}</td>
                    <td className="align-middle text-center">{item.ayat}</td>
                    <td className="align-middle">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => setDetail(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteSurah(item.id)}
                        >
                          {isLoading ? `Loading...` : `Hapus`}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </div>
      </div>
    </Layout>
  );
};

export default TahfizAlquran;
