import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import TableContainer from "../../components/tabel/TabelContainer";
import FormComponent from "./FormComponent";
import {
  useDeleteHomebaseMutation,
  useGetHomebasesQuery,
} from "../../control/api/homebaseApi";
import { toast } from "react-toastify";

const usersData = [
  { id: 1, first: "Mark", last: "Otto", handle: "@mdo" },
  { id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
  { id: 3, first: "Larry", last: "Bird", handle: "@twitter" },
  { id: 4, first: "John", last: "Doe", handle: "@jdoe" },
  { id: 5, first: "Jane", last: "Smith", handle: "@jsmith" },
  { id: 6, first: "Chris", last: "Evans", handle: "@cevans" },
  { id: 7, first: "Emily", last: "Clark", handle: "@eclark" },
  { id: 8, first: "Michael", last: "Scott", handle: "@mscott" },
  { id: 9, first: "Pam", last: "Beesly", handle: "@pbeesly" },
  { id: 10, first: "Dwight", last: "Schrute", handle: "@dschrute" },
];

const CenterSch = () => {
  const [detail, setDetail] = useState("");

  const { data } = useGetHomebasesQuery();
  const [deleteHomebase, { data: msg, isSuccess, isLoading, error, reset }] =
    useDeleteHomebaseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [msg, isSuccess, error]);

  return (
    <Layout title={"Satuan Pendidikan"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <FormComponent homebase={detail} clear={() => setDetail({})} />
        </div>
        <div className="col-lg-9 col-12 ">
          <TableContainer>
            <table className="table table-striped table-hover mt-2">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    #
                  </th>
                  <th scope="col" className="text-center">
                    Nama Satuan Pendidikan
                  </th>

                  <th scope="col" className="text-center">
                    Handle
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row" className="text-center">
                      {index + 1}
                    </th>
                    <td>{item.name}</td>

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
                          onClick={() => deleteHomebase(item.id)}
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

export default CenterSch;
