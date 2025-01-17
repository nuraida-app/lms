import React, { Fragment, useRef, useState } from "react";
import Layout from "../../components/Layout";
import TableContainer from "../../../components/tabel/TabelContainer";
import { useParams } from "react-router-dom";
import { useGetStudentsAnswerQuery } from "../../../control/api/answerApi";
import { useGetQuestionsQuery } from "../../../control/api/questionApi";
import { useGetClassByGradeQuery } from "../../../control/api/classApi";

const columns1 = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama Siswa" },
  { label: "Kelas" },
];

const columns2 = [{ label: "Benar" }, { label: "Salah" }, { label: "Nilai" }];

const CbtMc = ({ tableRef }) => {
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
  const { data: questions } = useGetQuestionsQuery(quizId, { skip: !quizId });
  const { data: classes } = useGetClassByGradeQuery({ gradeId });

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
            {columns1.map((column, i) => (
              <th
                rowSpan={2}
                key={i}
                scope="col"
                className="align-middle text-center"
              >
                {column.label}
              </th>
            ))}
            {questions
              ?.filter((q) => q.type === 1)
              ?.map((question, i) => (
                <th key={i} scope="col" className="text-center">
                  {i + 1}
                </th>
              ))}
            {columns2.map((column, i) => (
              <th
                rowSpan={2}
                key={i}
                scope="col"
                className="align-middle text-center"
              >
                {column.label}
              </th>
            ))}
          </tr>
          <tr>
            {questions
              ?.filter((q) => q.type === 1)
              ?.map((question, i) => (
                <th key={i} scope="col" className="text-center">
                  {question.key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {results?.map((user, index) => (
            <Fragment key={index}>
              <tr key={index}>
                <td rowSpan={2} className="align-middle text-center">
                  {(page - 1) * limit + index + 1}
                </td>
                <td rowSpan={2} className="align-middle text-center">
                  {user.nis}
                </td>
                <td rowSpan={2} className="align-middle ">
                  {user.name}
                </td>
                <td rowSpan={2} className="align-middle text-center">
                  {user.class}
                </td>
                {questions
                  ?.filter((q) => q.type === 1)
                  ?.map((q, i) => {
                    const answer = user.answers.find(
                      (a) => a.questionId === q.id
                    );

                    return (
                      <td key={i} className="align-middle text-center">
                        {answer ? answer.mc : "-"}
                      </td>
                    );
                  })}
                <td rowSpan={2} className="align-middle text-center">
                  {user.correct}
                </td>
                <td rowSpan={2} className="align-middle text-center">
                  {user.wrong}
                </td>
                <td rowSpan={2} className="align-middle text-center">
                  {user.mcPoin}
                </td>
              </tr>
              <tr>
                {questions
                  ?.filter((q) => q.type === 1)
                  ?.map((q, i) => {
                    const answer = user.answers.find(
                      (a) => a.questionId === q.id
                    );

                    return (
                      <td
                        key={i}
                        className={`align-middle text-center ${
                          answer?.poin == 0 ? "text-danger" : "text-success "
                        } fw-bold`}
                      >
                        {answer ? answer.poin : "-"}
                      </td>
                    );
                  })}
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default CbtMc;
