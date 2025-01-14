import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import FormComponent from "./FormComponent";
import TableContainer from "../../components/tabel/TabelContainer";
import {
  useDeleteTeacherMutation,
  useGetTeacherQuery,
  useGetTeachersQuery,
} from "../../control/api/teacherApi";
import BtnLoader from "../../components/loader/BtnLoader";
import { toast } from "react-toastify";

const colums = [
  { label: "No" },
  { label: "NIP" },
  { label: "Nama" },
  { label: "Mapel" },
  { label: "Wali Kelas" },
  { label: "Kelas" },
  { label: "Aksi" },
];

const CenterTeacher = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");

  const { data: detail } = useGetTeacherQuery(id, { skip: !id });
  const { data: rowData = {} } = useGetTeachersQuery({ page, limit, search });
  const { teachers = [], totalPages, total } = rowData;
  const [deleteTeacher, { data, isSuccess, isLoading, error, reset }] =
    useDeleteTeacherMutation();

  const deleteHandler = (id) => deleteTeacher(id);

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
    <Layout title={"Daftar Guru"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <FormComponent detail={detail} id={id} />
        </div>
        <div className="col-lg-9 col-12">
          <TableContainer
            page={page}
            setPage={(e) => setPage(e)}
            setLimit={(e) => setLimit(e)}
            onValue={(e) => setSearch(e)}
            totalPages={totalPages}
          >
            <div className="d-flex align-items-center justify-content-between">
              <p className="h6">
                Jumlah Guru: <span>{total}</span>
              </p>

              <button className="btn btn-danger">Kosongkan Data</button>
            </div>
            <table className="table table-striped table-hover mt-2">
              <thead>
                <tr>
                  {colums?.map((column) => (
                    <th key={column.label} scope="col" className="text-center">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={teacher.id}>
                    <th scope="row" className="align-middle text-center">
                      {(page - 1) * limit + index + 1}
                    </th>
                    <td className="align-middle text-center">{teacher.nip}</td>
                    <td className="align-middle">{teacher.name}</td>
                    <td className="align-middle">
                      {[
                        ...new Set(
                          teacher.subjects.map((subject) => subject.subject)
                        ),
                      ]?.map((subjectName, index) => (
                        <p key={`${teacher.id}-${index}`} className="m-0">
                          {subjectName}
                        </p>
                      ))}
                    </td>
                    <td className="align-middle text-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={teacher.homeroom === 1 ? "checked" : null}
                        readOnly
                      />
                    </td>
                    <td className="align-middle text-center">
                      {teacher.class}
                    </td>
                    <td className="align-middle">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => setId(teacher.id)}
                        >
                          Edit
                        </button>
                        {isLoading ? (
                          <BtnLoader />
                        ) : (
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteHandler(teacher.id)}
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

export default CenterTeacher;
