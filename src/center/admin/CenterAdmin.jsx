import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import FormComponent from "./FormComponent";
import TableContainer from "../../components/tabel/TabelContainer";
import {
  useDeleteAdminMutation,
  useGetAdminsQuery,
} from "../../control/api/adminApi";
import { toast } from "react-toastify";

const columns = [
  { label: "No" },
  { label: "Nama Admin" },
  { label: "Level" },
  { label: "Aksi" },
];

const CenterAdmin = () => {
  const [admin, setAdmin] = useState({});

  const { data } = useGetAdminsQuery();
  const [deleteAdmin, { data: msg, isSuccess, isLoading, error, reset }] =
    useDeleteAdminMutation();

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
    <Layout title={"Daftar Administrator"}>
      <div className="containter-fluid row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <FormComponent admin={admin} remove={() => setAdmin({})} />
        </div>
        <div className="col-lg-9 col-12">
          <TableContainer>
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
                {data?.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row" className="text-center">
                      {index + 1}
                    </th>
                    <td>{user.name}</td>
                    <td className="text-center">{user.role}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => setAdmin(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteAdmin(user.id)}
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

export default CenterAdmin;
