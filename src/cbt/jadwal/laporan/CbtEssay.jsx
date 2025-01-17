import React, { useState, useEffect } from "react";
import TableContainer from "../../../components/tabel/TabelContainer";
import { useParams } from "react-router-dom";
import {
  useGetStudentsAnswerQuery,
  useGiveScoreMutation,
} from "../../../control/api/answerApi";
import { useGetQuestionsQuery } from "../../../control/api/questionApi";
import { useGetClassByGradeQuery } from "../../../control/api/classApi";
import { toast } from "react-toastify";

const createMarkup = (html) => {
  return { __html: html };
};

const columns = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama Siswa" },
  { label: "Kelas" },
  { label: "Nilai" },
  { label: "Aksi" },
];

const CbtEssay = ({ tabelRef }) => {
  const params = useParams();

  const quizId = params.bankid;
  const gradeId = params.gradeid;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("");
  const [user, setUser] = useState("");
  const [poinValue, setPoin] = useState({});

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
  const qEssay = questions?.filter((q) => q.type === 2);

  const [giveScore, { data, isSuccess, isLoading, error, reset }] =
    useGiveScoreMutation();

  const poinHandler = (id, poin) => {
    setPoin((prevState) => ({
      ...prevState,
      [id]: poin,
    }));
  };

  const submitHandler = async () => {
    const data = Object.entries(poinValue).map(([id, poin]) => ({
      questionId: id,
      poin: poin,
    }));

    await Promise.all(
      data.map(({ questionId, poin }) => {
        giveScore({
          id: questionId,
          body: { poin, nis: user.nis, gradeId, quizId },
        });
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      setUser("");
    }

    if (error) {
      toast.error(error.data.message);
      reset();
      console.log(error);
    }
  }, [data, isSuccess, error]);

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

      <table ref={tabelRef} className="table table-striped table-hover">
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
              <td className="align-middle text-center">
                {(page - 1) * limit + index + 1}
              </td>
              <td className="align-middle text-center">{user.nis}</td>
              <td className="align-middle">{user.name}</td>
              <td className="align-middle text-center">{user.class}</td>
              <td className="align-middle text-center">{user.essayPoin}</td>
              <td className="align-middle text-center">
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#nilai"
                  onClick={() => setUser(user)}
                >
                  Koreksi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="nilai"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Jawaban Essay <span>{user.name}</span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-column gap-2">
              {qEssay?.map((q, i) => {
                const answer = user.answers?.find(
                  (a) => a.questionId === q.id
                )?.essay;
                return (
                  <div key={i} className="d-flex gap-1 rounded shadow p-2">
                    <div className="d-flex flex-column gap-1 p-2">
                      <p
                        className="m-0"
                        dangerouslySetInnerHTML={createMarkup(q.question)}
                      />
                      <p className="m-0 fst-italic">
                        Jawaban:{" "}
                        <span dangerouslySetInnerHTML={createMarkup(answer)} />
                      </p>
                      <input
                        type="numeric"
                        className="form-control"
                        placeholder="Nilai"
                        value={
                          poinValue[q.id] !== undefined
                            ? poinValue[q.id]
                            : user.answers?.find((a) => a.questionId === q.id)
                                ?.poin !== undefined
                            ? user.answers?.find((a) => a.questionId === q.id)
                                ?.poin
                            : 0
                        }
                        onChange={(e) => poinHandler(q.id, e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                tutup
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitHandler}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </TableContainer>
  );
};

export default CbtEssay;
