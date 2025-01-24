import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import TableContainer from "../../components/tabel/TabelContainer";
import FormComponent from "./FormComponent";
import {
  useDeleteGradeMutation,
  useGetGradesQuery,
} from "../../control/api/gradeApi";
import { toast } from "react-toastify";

const CenterGrade = () => {
  const [detail, setDetail] = useState("");
  const { data } = useGetGradesQuery();
  const [deleteGrade, { data: msg, isSuccess, isLoading, error, reset }] =
    useDeleteGradeMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [msg, isSuccess, error]);
  return (
    <Layout title={"Jenjang Pendidikan"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <FormComponent detail={detail} clear={() => setDetail({})} />
        </div>
        <div className="col-lg-9 col-12">
          <TableContainer>
            <table className="table table-striped table-hover mt-2">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    #
                  </th>
                  <th scope="col" className="text-center">
                    Satuan
                  </th>
                  <th scope="col" className="text-center">
                    Jenjang
                  </th>
                  <th scope="col" className="text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row" className="aign-middle text-center">
                      {index + 1}
                    </th>
                    <td className="aign-middle text-center">{item.homebase}</td>
                    <td className="aign-middle text-center">{item.grade}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => setDetail(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteGrade(item.id)}
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

export default CenterGrade;
