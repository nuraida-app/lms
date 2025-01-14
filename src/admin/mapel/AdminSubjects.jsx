import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import FormComponent from "./FormComponent";
import TableContainer from "../../components/tabel/TabelContainer";
import {
  useDeleteSubjectMutation,
  useDeleteSubjectsMutation,
  useGetSubjectQuery,
  useGetSubjectsQuery,
} from "../../control/api/subjectApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";

const columns = [
  { label: "No" },
  { label: "Kode" },
  { label: "Satuan" },
  { label: "Nama" },
  { label: "Aksi" },
];

const AdminSubjects = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");

  const { data: detail } = useGetSubjectQuery(id, { skip: !id });
  const {
    data: rowData = {},
    isLoading,
    error,
  } = useGetSubjectsQuery({
    page,
    limit,
    search,
  });
  const { subjects = [], totalPages, total } = rowData;
  const [
    deleteSubject,
    {
      data: delMsg,
      isSuccess: dSuccess,
      isLoading: dLoading,
      error: dError,
      reset: dReset,
    },
  ] = useDeleteSubjectMutation();
  const [deleteSubjects] = useDeleteSubjectsMutation();

  const deleteHandler = (code) => {
    const confirm = window.confirm(
      `Apakah anda yakin menghapus mata pelajaran, bab, topik dan file?`
    );

    if (confirm) {
      deleteSubject(code);
    }
  };

  const clearData = () => {
    const confirm = window.confirm(
      `Apakah anda yakin akan menghapus database mapel?`
    );

    if (confirm) {
      deleteSubjects();
    }
  };

  useEffect(() => {
    if (dSuccess) {
      toast.success(delMsg.message);
      dReset();
      window.location.reload();
    }

    if (dError) {
      toast.error(dError.data.message);
      dReset();
    }
  }, [delMsg, dSuccess, dError]);

  return (
    <Layout title={"Mata Pelajaran"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <FormComponent detail={detail} id={id} />
        </div>
        <div className="col-lg-9 col-12">
          <TableContainer
            page={page}
            setLimit={(e) => setLimit(e)}
            setPage={(e) => setPage(e)}
            onValue={(e) => setSearch(e)}
            totalPages={totalPages}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className="m-0">
                Total Mata Pelajaran: <span>{total}</span>
              </p>

              <button className="btn btn-danger" onClick={clearData}>
                Kosongkan Data
              </button>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  {columns?.map((column) => (
                    <th className="text-center" scope="col" key={column.label}>
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={subject.id}>
                    <th scope="row" className="text-center align-middle">
                      {(page - 1) * limit + index + 1}
                    </th>
                    <td className="text-center align-middle">{subject.code}</td>
                    <td className="text-center align-middle">
                      {subject.homebase}
                    </td>
                    <td className="align-middle">{subject.name}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => setId(subject.id)}
                        >
                          Edit
                        </button>
                        {dLoading ? (
                          <BtnLoader />
                        ) : (
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteHandler(subject.code)}
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

export default AdminSubjects;
