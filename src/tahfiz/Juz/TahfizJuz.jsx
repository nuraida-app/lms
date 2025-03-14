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

  const handleDetail = (detail, juzId) => {
    const data = {
      juz_id: juzId,
      surah_id: detail.surah_id,
      id: detail.id,
      surah: detail.surah,
      from_ayat: detail.from_ayat,
      to_ayat: detail.to_ayat,
      from_line: detail.from_line,
      to_line: detail.to_line,
    };

    setDetail(data);
  };

  return (
    <Layout title={"Juz Al Qur'an"}>
      <div className="row">
        <div className="col-md-3 col-12">
          <Form detail={detail} close={() => setDetail({})} />
          <Surah detail={detail} close={() => setDetail({})} />
        </div>
        <div className="col-md-9 col-12">
          <div style={{ height: "90vh", overflow: "auto" }}>
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
                    <th className="text-center">Dari Baris</th>
                    <th className="text-center">Sampai Baris</th>
                    <th className="text-center">Edit Surah</th>
                    <th className="text-center">Ayat</th>
                    <th className="text-center">Baris</th>
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
                            <td className="text-center align-middle">
                              {item.surah[0].from_line}
                            </td>
                            <td className="text-center align-middle">
                              {item.surah[0].to_line}
                            </td>
                            <td className="text-center align-middle">
                              <button
                                className="btn btn-warning"
                                onClick={() =>
                                  handleDetail(item.surah[0], item.id)
                                }
                              >
                                Edit Surah
                              </button>
                            </td>
                          </>
                        ) : (
                          <td colSpan={6} className="text-center align-middle">
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
                          {item.total_line}
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
                          <td className="text-center align-middle">
                            {s.surah}
                          </td>
                          <td className="text-center align-middle">
                            {s.from_ayat}
                          </td>
                          <td className="text-center align-middle">
                            {s.to_ayat}
                          </td>
                          <td className="text-center align-middle">
                            {s.from_line}
                          </td>
                          <td className="text-center align-middle">
                            {s.to_line}
                          </td>
                          <td className="text-center align-middle">
                            <button
                              className="btn btn-warning"
                              onClick={() => handleDetail(s, item.id)}
                            >
                              Edit Surah
                            </button>
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
      </div>
    </Layout>
  );
};

export default TahfizJuz;
