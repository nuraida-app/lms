import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import FormComponent from "./FormComponent";
import {
  useDeleteTypeMutation,
  useGetTypesQuery,
} from "../../control/api/metricApi";
import { toast } from "react-toastify";

const columns = [
  { label: "No" },
  { label: "Jenis Penilaian" },
  { label: "Aksi" },
];

const TahfizAssess = () => {
  const [detail, setDetail] = useState({});

  const { data: types } = useGetTypesQuery();
  const [deleteType, { data, isSuccess, isLoading, error, reset }] =
    useDeleteTypeMutation();

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
    <Layout title={"Jenis Penilaian"}>
      <div className="row g-2">
        <div className="col-md-3 col-12">
          <FormComponent detail={detail} clear={() => setDetail({})} />
        </div>
        <div className="col-md-9 col-12">
          <div className="table-responsive rounded p-2 border border-2 shadow bg-white">
            <table className="table table-stripped table-hover">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th scope="col" key={col.label}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {types?.map((item, i) => (
                  <tr key={i}>
                    <td className="text-center align-middle">{i + 1}</td>
                    <td className="align-middle">{item.name}</td>
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
                          onClick={() => deleteType(item.id)}
                        >
                          {isLoading ? `Loading...` : `Hapus`}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TahfizAssess;
