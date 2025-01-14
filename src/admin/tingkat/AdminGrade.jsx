import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import FormComponent from "./FormComponent";
import TableContainer from "../../components/tabel/TabelContainer";
import MetaData from "../../components/meta/MetaData";
import {
  useDeleteGradeMutation,
  useGetGradesQuery,
} from "../../control/api/gradeApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";

const colomns = [
  { label: "No" },
  { label: "Satuan" },
  { label: "Tingkat" },
  { label: "Aksi" },
];

const AdminGrade = () => {
  const { data } = useGetGradesQuery();
  const [deleteGrade, { data: msg, isLoading, isSuccess, error, reset }] =
    useDeleteGradeMutation();

  const delData = (id) => deleteGrade(id);

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
    <Layout>
      <MetaData title={"Admin Tingkat"} />
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <FormComponent />
        </div>
        <div className="col-lg-9 col-12">
          <TableContainer>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  {colomns.map((item, i) => (
                    <th key={i} scope="col" className="text-center">
                      {item.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row" className="text-center">
                      {index + 1}
                    </th>
                    <td>{item.homebase}</td>
                    <td className="text-center">{item.grade}</td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        {isLoading ? (
                          <BtnLoader />
                        ) : (
                          <button
                            className="btn btn-danger"
                            onClick={() => delData(item.id)}
                          >
                            - Hapus
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

export default AdminGrade;
