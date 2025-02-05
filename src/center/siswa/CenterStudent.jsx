import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import TableContainer from "../../components/tabel/TabelContainer";
import FormComponent from "./FormComponent";
import {
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from "../../control/api/studentApi";
import { toast } from "react-toastify";

const CenterStudent = () => {
  const [detail, setDetail] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [search, setSearch] = useState("");
  const homebase = "";
  const gradeId = "";
  const classCode = "";

  const { data: rawData = {} } = useGetStudentsQuery({
    page,
    limit,
    search,
    homebase,
    gradeId,
    classCode,
  });
  const { students, totalPages, totalStudents } = rawData;

  const [deleteStudent, { data, isSuccess, isLoading, error, reset }] =
    useDeleteStudentMutation();

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
    <Layout title={"Daftar Siswa"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <FormComponent student={detail} clear={() => setDetail({})} />
        </div>
        <div
          className="col-lg-9 col-12"
          style={{ height: "100%", overflow: "auto" }}
        >
          <TableContainer
            page={page}
            setPage={(e) => setPage(e)}
            setLimit={(e) => setLimit(e)}
            onValue={(e) => setSearch(e)}
            totalPages={totalPages}
          >
            <div className="d-flex align-items-center justify-content-between my-1">
              <h6 className="m-0">
                Jumlah Siswa <span>{totalStudents}</span>
              </h6>

              <button className="btn btn-danger">Hapus Data</button>
            </div>
            <table className="table table-striped table-hover mt-2">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    #
                  </th>
                  <th scope="col" className="text-center">
                    Tahun Ajar
                  </th>
                  <th scope="col" className="text-center">
                    NIS
                  </th>
                  <th scope="col" className="text-center">
                    Nama Siswa
                  </th>
                  <th scope="col" className="text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {students?.map((student, index) => (
                  <tr key={student.id}>
                    <th scope="row" className="text-center">
                      {(page - 1) * limit + index + 1}
                    </th>
                    <td className="text-center align-middle">{student.year}</td>
                    <td className="text-center align-middle">{student.nis}</td>
                    <td className="align-middle">{student.name}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => setDetail(student)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteStudent(student.id)}
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

export default CenterStudent;
