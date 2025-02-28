import React, { Fragment, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Form from "./Form";
import {
  useDeleteJuzMutation,
  useGetJuzQuery,
} from "../../control/api/quranApi";
import TableContainer from "../../components/tabel/TabelContainer";
import { toast } from "react-toastify";
import Surah from "./Surah";

const TahfizJuz = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [detail, setDetail] = useState({});

  const { data: rawData = {} } = useGetJuzQuery({ page, search, limit });
  const { juz = [], totalPage, totalData } = rawData;
  const [deleteJuz, { data, isSuccess, isLoading, error, reset }] =
    useDeleteJuzMutation();

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
    <Layout title={"Juz Al Qur'an"}>
      <div className="row">
        <div className="col-md-3 col-12">
          <Form detail={detail} close={() => setDetail({})} />

          <Surah />
        </div>
        <div className="col-md-9 col-12">
          <TableContainer
            page={page}
            setPage={(e) => setPage(e)}
            setLimit={(e) => setLimit(e)}
            onValue={(e) => setSearch(e)}
            totalPages={totalPage}
          >
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <td className="text-center">No</td>
                  <td className="text-center">Juz</td>
                  <td className="text-center">Surah</td>
                  <td className="text-center">Dari Ayat</td>
                  <td className="text-center">Sampai Ayat</td>
                  <td className="text-center">Total Ayat</td>
                  <td className="text-center">Total Baris</td>
                  <td className="text-center">Aksi</td>
                </tr>
              </thead>
              <tbody>
                {juz?.map((item, i) => (
                  <tr key={i}>
                    <td className="text-center align-middle">
                      {(page - 1) * limit + i + 1}
                    </td>
                    <td className="align-middle">{item.name}</td>
                    {item.surah.length > 0 ? (
                      item.surah?.map((s) => (
                        <Fragment>
                          <td key={s.id}>{s.name}</td>
                        </Fragment>
                      ))
                    ) : (
                      <td colSpan={5} className="text-center align-middle">
                        Data belum tersedia
                      </td>
                    )}
                    <td className="text-center align-middle">
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-success">Tambah</button>
                        <button
                          className="btn btn-warning"
                          onClick={() => setDetail(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          disabled={isLoading}
                          onClick={() => deleteJuz(item.id)}
                        >
                          Hapus
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

export default TahfizJuz;
