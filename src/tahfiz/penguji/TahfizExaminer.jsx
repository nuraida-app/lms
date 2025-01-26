import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import FormComponent from "./FormComponent";
import {
  useDeleteExaminerMutation,
  useGetExaminersQuery,
} from "../../control/api/examinerApi";
import TableContainer from "../../components/tabel/TabelContainer";
import { toast } from "react-toastify";

const TahfizExaminer = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const [detail, setDetail] = useState({});

  const { data: rawData = {} } = useGetExaminersQuery({ page, limit, search });
  const { examiners = [], totalData, totalPages } = rawData;
  const [deleteExaminer, { data, isSuccess, isLoading, error, reset }] =
    useDeleteExaminerMutation();

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

  console.log(examiners);

  return (
    <Layout title={"Penguji Tahfiz"}>
      <div className="row">
        <div className="col-md-3 col-12">
          <FormComponent examiner={detail} clear={() => setDetail({})} />
        </div>
        <div className="col-md-9 col-12">
          <TableContainer
            page={page}
            setPage={(e) => setPage(e)}
            setLimit={(e) => setLimit(e)}
            onValue={(e) => setSearch(e)}
            totalPages={totalPages}
          >
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <td className="text-center align-middle">No</td>
                  <td className="text-center align-middle">Nama Penguji</td>
                  <td className="text-center align-middle">Aksi</td>
                </tr>
              </thead>
              <tbody>
                {examiners?.map((item, i) => (
                  <tr key={i}>
                    <td className="text-center align-middle">
                      {(page - 1) * limit + i + 1}
                    </td>
                    <td className="align-middle">{item.name}</td>
                    <td className="text-center align-middle">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => setDetail(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteExaminer(item.id)}
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

export default TahfizExaminer;
