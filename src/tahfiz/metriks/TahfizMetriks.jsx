import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AddCat from "./AddCat";
import {
  useDeleteCategoryMutation,
  useDeleteIndicatorMutation,
  useGetCategoriesQuery,
} from "../../control/api/metricApi";
import AddIndicator from "./AddIndicator";
import { toast } from "react-toastify";

const columns = [
  { label: "No" },
  { label: "Kategori Penilaian" },
  { label: "Indikator" },
  { label: "Aksi" },
];

const TahfizMetriks = () => {
  const [category, setCategory] = useState({});
  const [indicator, setIndicator] = useState({});

  const { data } = useGetCategoriesQuery();
  const [deleteCategory, { data: msg, isSuccess, isLoading, error, reset }] =
    useDeleteCategoryMutation();
  const [
    deleteIndicator,
    {
      data: dMsg,
      isSuccess: dSuccess,
      isLoading: dLoad,
      error: dError,
      reset: dReset,
    },
  ] = useDeleteIndicatorMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg?.message);
      reset();
    }

    if (dSuccess) {
      toast.success(dMsg?.message);
      dReset();
    }

    if (error) {
      toast.error(error?.data?.message);
      reset();
    }

    if (dError) {
      toast.error(dError?.data?.message);
      dReset();
    }
  }, [isSuccess, dSuccess, error, dError, msg, dMsg, reset, dReset]);

  return (
    <Layout title={"Metriks"}>
      <div className="row">
        <div className="col-md-3 col-12">
          <AddCat category={category} clear={() => setCategory({})} />

          <AddIndicator
            categories={data}
            indicator={indicator}
            clear={() => setIndicator({})}
          />
        </div>
        <div className="col-md-9 col-12">
          <div className="table-responsive rounded p-2 border border-2 shadow bg-white">
            <table className="table table-striped table-hover">
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
                {data?.map((item, i) => (
                  <tr key={i}>
                    <th scope="col" className="text-center align-middle">
                      {i + 1}
                    </th>
                    <td className="align-middle">{item.category}</td>

                    <td className="align-middle">
                      <div className="d-flex flex-column gap-2">
                        {Array.isArray(item.indicators) &&
                        item.indicators.filter((indi) => indi !== null).length >
                          0 ? (
                          item.indicators
                            .filter((indi) => indi !== null)
                            .map((indi, i) => (
                              <div
                                key={i}
                                className="d-flex align-items-center justify-content-between p-2 rounded border border-2 pointer"
                              >
                                <p className="m-0">{indi.name}</p>

                                <div className="d-flex align-items-center gap-2">
                                  {/* Edit Button */}
                                  <div
                                    className="rounded-circle d-flex align-items-center justify-content-center bg-warning pointer"
                                    style={{ height: 30, width: 30 }}
                                    onClick={() => setIndicator(indi)}
                                  >
                                    <i className="bi bi-pencil-square"></i>
                                  </div>

                                  {/* Delete Button */}
                                  <div
                                    className="rounded-circle d-flex align-items-center justify-content-center bg-danger pointer"
                                    style={{ height: 30, width: 30 }}
                                    onClick={() => deleteIndicator(indi.id)}
                                  >
                                    <i className="bi bi-x text-white"></i>
                                  </div>
                                </div>
                              </div>
                            ))
                        ) : (
                          <p className="m-0 text-muted">
                            Belum ada indikator untuk kategori ini
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="align-middle">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => setCategory(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteCategory(item.id)}
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

export default TahfizMetriks;
