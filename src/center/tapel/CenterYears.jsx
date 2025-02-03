import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import FormComponent from "./FormComponent";
import {
  useDeleteYearMutation,
  useGetYearsQuery,
} from "../../control/api/yearApi";
import TableContainer from "../../components/tabel/TabelContainer";
import { toast } from "react-toastify";

const CenterYears = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState({});

  const { data: rawData = {} } = useGetYearsQuery({ page, limit, search });
  const { data, totalPages, total } = rawData;
  const [deleteYear, { data: msg, isSuccess, isLoading, error, reset }] =
    useDeleteYearMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  return (
    <Layout title={"Tahun Pelajaran"}>
      <div className="row g-2">
        <div className="col-md-3 col-12">
          <FormComponent year={year} clear={() => setYear({})} />
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
                  <th className="text-center">No</th>
                  <th className="text-center">Tahun Pelajaran</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, i) => (
                  <tr key={i}>
                    <td className="text-center align-middle">
                      {(page - 1) * limit + i + 1}
                    </td>
                    <td className="align-middle">{item.name}</td>
                    <td className="text-center align-middle">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => setYear(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          disabled={isLoading ? true : false}
                          onClick={() => deleteYear(item.id)}
                        >
                          {isLoading ? "Loading..." : "Hapus"}
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

export default CenterYears;
