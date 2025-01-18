import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import FormComponent from "./FormComponent";
import TableContainer from "../../components/tabel/TabelContainer";
import { useNavigate } from "react-router-dom";
import {
  useDeleteClassMutation,
  useGetClassMutation,
  useGetClassesQuery,
} from "../../control/api/classApi";
import BtnLoader from "../../components/loader/BtnLoader";
import { toast } from "react-toastify";

const columns = [
  { label: "No" },
  { label: "Satuan" },
  { label: "Tingkat" },
  { label: "Kode Kelas" },
  { label: "Kelas" },
  { label: "Jumlah Siswa" },
  { label: "Aksi" },
];

const AdminClass = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");

  const { data: rowData = {} } = useGetClassesQuery({ page, limit, search });
  const { classes = [], totalPages } = rowData;
  const [getClass, { data: detail }] = useGetClassMutation();
  const [deleteClass, { data: msg, isSuccess, isLoading, error, reset }] =
    useDeleteClassMutation();

  const goToLink = (grade, name, code) =>
    navigate(`/admin-kelas-daftar-siswa/${grade}/${name}/${code}`);

  const remove = (id) => deleteClass(id);

  useEffect(() => {
    if (id) {
      getClass(id);
    }
  }, [id]);

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
    <Layout title={"Daftar Kelas"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <FormComponent detail={detail} />
        </div>
        <div className="col-lg-9 col-12">
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
                  {columns.map((item, i) => (
                    <th key={i} scope="col" className="text-center">
                      {item.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {classes?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row" className="text-center">
                      {index + 1}
                    </th>
                    <td className="text-center">{item.homebase}</td>
                    <td className="text-center">{item.grade}</td>
                    <td className="text-center">{item.code}</td>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">{item.students}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            goToLink(item.grade_id, item.name, item.code)
                          }
                        >
                          Tambah Siswa
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
                            onClick={() => remove(item.id)}
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

export default AdminClass;
