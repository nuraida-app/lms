import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import FormComponent from "./FormComponent";
import TableContainer from "../../components/tabel/TabelContainer";
import { useGetTeachersQuery } from "../../control/api/teacherApi";

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

  const { data: rowData = {} } = useGetTeachersQuery({ page, limit, search });
  const { teachers = [], totalPages, total } = rowData;

  return (
    <Layout title={"Daftar Guru"}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12">
          <FormComponent />
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
                      {teacher.subjects.map((subject, index) => (
                        <p key={index} className="m-0">
                          {subject.subject}
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
                        <button className="btn btn-warning">Edit</button>
                        <button className="btn btn-danger">Hapus</button>
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
