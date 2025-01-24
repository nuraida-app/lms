import React, { useState, useEffect } from "react";
import TableContainer from "../../../components/tabel/TabelContainer";
import { useParams } from "react-router-dom";
import { useGetStudentsAnswerQuery } from "../../../control/api/answerApi";
import { useGetQuestionsQuery } from "../../../control/api/questionApi";
import { useGetClassByGradeQuery } from "../../../control/api/classApi";

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

const columns = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama Siswa" },
  { label: "Kelas" },
  { label: "Pilihan Ganda" },
  { label: "Uraian" },
  { label: "Nilai" },
];

const CbtScore = ({ tableRef }) => {
  const params = useParams();

  const quizId = params.bankid;
  const gradeId = params.gradeid;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("");

  const { data: rawData = {} } = useGetStudentsAnswerQuery({
    quizId,
    gradeId,
    page,
    limit,
    search,
    code,
  });
  const { results = [], totalPages, totalData } = rawData;
  const { data: classes } = useGetClassByGradeQuery(gradeId);

  return (
    <TableContainer
      page={page}
      setPage={(e) => setPage(e)}
      setLimit={(e) => setLimit(e)}
      onValue={(e) => setSearch(e)}
      totalPages={totalPages}
    >
      <div className="d-flex align-items-center justify-content-between">
        <p className="m-0 h6">
          Jumlah Siswa: <span>{totalData}</span>
        </p>

        <div className="d-flex align-items-center justify-content-end flex-wrap gap-1">
          <button className="btn btn-secondary" onClick={() => setCode("")}>
            Reset
          </button>
          {classes?.map((item) => (
            <button
              key={item.id}
              className="btn btn-secondary"
              onClick={() => setCode(item.code)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <table ref={tableRef} className="table table-striped table-hover">
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
          {results?.map((user, index) => (
            <tr key={index}>
              <td className="text-center">{(page - 1) * limit + index + 1}</td>
              <td className="text-center">{user.nis}</td>
              <td>{user.name}</td>
              <td className="text-center">{user.class}</td>
              <td className="text-center">{user.mcPoin}</td>
              <td className="text-center">{user.essayPoin}</td>
              <td className="text-center">{user.totalPoin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default CbtScore;
