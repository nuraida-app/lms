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
  const { juz = [], totalPage } = rawData;
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
  console.log(juz);

  return (
    <Layout title={"Juz Al Qur'an"}>
      <div className="row">
        <div className="col-md-3 col-12">
          <Form detail={detail} close={() => setDetail({})} />
          <Surah detail={detail} close={() => setDetail({})} />
        </div>
        <div className="col-md-9 col-12">
          <TableContainer
            page={page}
            setPage={(e) => setPage(e)}
            setLimit={(e) => setLimit(e)}
            onValue={(e) => setSearch(e)}
            totalPages={totalPage}
          >
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th className="text-center">No</th>
                  <th className="text-center">Juz</th>
                  <th className="text-center">Surah</th>
                  <th className="text-center">Dari Ayat</th>
                  <th className="text-center">Sampai Ayat</th>
                  <th className="text-center">Total Ayat</th>
                  <th className="text-center">Total Baris</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {juz.map((item, i) => (
                  <Fragment key={i}>
                    <tr>
                      <td
                        rowSpan={item.surah.length || 1}
                        className="text-center"
                      >
                        {(page - 1) * limit + i + 1}
                      </td>
                      <td rowSpan={item.surah.length || 1}>{item.name}</td>
                      {item.surah.length > 0 ? (
                        <>
                          <td className="text-center align-middle">
                            {item.surah[0].surah}
                          </td>
                          <td className="text-center align-middle">
                            {item.surah[0].from_ayat}
                          </td>
                          <td className="text-center align-middle">
                            {item.surah[0].to_ayat}
                          </td>
                        </>
                      ) : (
                        <td colSpan={3} className="text-center align-middle">
                          Data belum tersedia
                        </td>
                      )}
                      <td
                        rowSpan={item.surah.length || 1}
                        className="text-center"
                      >
                        {item.total_ayat}
                      </td>
                      <td
                        rowSpan={item.surah.length || 1}
                        className="text-center"
                      >
                        0
                      </td>
                      <td
                        rowSpan={item.surah.length || 1}
                        className="text-center"
                      >
                        <div className="d-flex justify-content-center gap-2">
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
                    {item.surah.slice(1).map((s, idx) => (
                      <tr key={idx}>
                        <td className="text-center align-middle">{s.surah}</td>
                        <td className="text-center align-middle">
                          {s.from_ayat}
                        </td>
                        <td className="text-center align-middle">
                          {s.to_ayat}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
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
