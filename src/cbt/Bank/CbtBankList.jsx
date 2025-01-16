import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TableContainer from "../../components/tabel/TabelContainer";
import Addbank from "./forms/Addbank";
import { useNavigate } from "react-router-dom";
import {
  useDeleteQuizMutation,
  useGetQuizesQuery,
  useGetQuizQuery,
} from "../../control/api/quizApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";

const columns = [
  { label: "No" },
  { label: "Nama Guru" },
  { label: "Nama Bank Soal" },
  { label: "Tingkat" },
  { label: "PG" },
  { label: "Essay" },
  { label: "Aksi" },
];

const CbtBankList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");

  const { data: rowData = {} } = useGetQuizesQuery({ page, limit, search });
  const { quizes = [], totalPages, total } = rowData;
  const { data: detail } = useGetQuizQuery(id, { skip: !id });
  const [deleteQuiz, { data, isSuccess, isLoading, error, reset }] =
    useDeleteQuizMutation();

  const handleDelete = (id) => deleteQuiz(id);

  const goToLink = (id) => navigate(`/cbt-bank-soal/${id}/soal`);

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
    <Layout title={"Bank Soal"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <Addbank detail={detail} id={id} />
        </div>
        <div
          className="col-lg-9 cool-12"
          style={{ maxHeight: "calc(100vh - 70px)", overflow: "auto" }}
        >
          <TableContainer
            page={page}
            setPage={(e) => setPage(e)}
            setLimit={(e) => setLimit(e)}
            onValue={(e) => setSearch(e)}
            totalPages={totalPages}
          >
            <table className="table table-striped table-hover mt-2">
              <thead>
                <tr>
                  {columns.map((column, i) => (
                    <th key={i} scope="col" className="text-center">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {quizes.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row" className="align-middle text-center">
                      {(page - 1) * limit + index + 1}
                    </th>
                    <td className="align-middle">{item.teacher}</td>
                    <td className="align-middle">{item.quiz_name}</td>
                    <td className="align-middle text-center">{item.grade}</td>
                    <td className="align-middle text-center">{item.mc}</td>
                    <td className="align-middle text-center">{item.essay}</td>

                    <td>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <button
                          className="btn btn-success"
                          onClick={() => goToLink(item.id)}
                        >
                          Soal
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => setId(item.id)}
                        >
                          Edit
                        </button>
                        {isLoading ? (
                          <BtnLoader />
                        ) : (
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Hapus
                          </button>
                        )}
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

export default CbtBankList;
