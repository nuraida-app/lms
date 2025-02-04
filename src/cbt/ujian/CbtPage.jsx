import React, { Fragment, useEffect, useState } from "react";
import Top from "./Top";
import CbtQuestions from "./CbtQuestions";
import CbtTimer from "./CbtTimer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MetaData from "../../components/meta/MetaData";
import { useGetQuestionsQuery } from "../../control/api/questionApi";
import { useGetMyAnswersQuery } from "../../control/api/answerApi";
import {
  useFinishedQuizMutation,
  useGetMyLogQuery,
} from "../../control/api/logApi";
import { toast } from "react-toastify";

const CbtPage = () => {
  const params = useParams();
  const { name, bankId, time } = params;

  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(1);

  const { user } = useSelector((state) => state.auth);
  const { data, refetch, isLoading } = useGetQuestionsQuery(bankId, {
    skip: !bankId,
  });
  const { data: answers } = useGetMyAnswersQuery(bankId, { skip: !bankId });
  const [finishedQuiz, { data: message, isSuccess, isLoading: fLoad, error }] =
    useFinishedQuizMutation();

  const { data: log } = useGetMyLogQuery(
    { nis: user?.nis, quiz: bankId },
    { skip: !user?.nis || !bankId }
  );

  const refreshQuestions = () => {
    refetch(); // Mengambil ulang data soal dari API

    if (data && Array.isArray(data.questions)) {
      localStorage.setItem("questions", JSON.stringify(data));
      setQuestions(data.questions);
    }
  };

  // Menentukan pertanyaan yang sedang ditampilkan
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions?.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Fungsi untuk mengubah halaman
  const handlePageChange = (event, page) => {
    if (page >= 1 && page <= Math.ceil(questions.length / questionsPerPage)) {
      setCurrentPage(page); // Set current page yang baru
    }
  };

  const finishHandler = () => {
    finishedQuiz(bankId);
  };

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");

    if (storedQuestions) {
      const parsedQuestions = JSON.parse(storedQuestions);
      if (Array.isArray(parsedQuestions.questions)) {
        setQuestions(parsedQuestions.questions);
      } else {
        setQuestions([]);
      }
    } else {
      if (data && Array.isArray(data.questions)) {
        localStorage.setItem("questions", JSON.stringify(data));
        setQuestions(data.questions);
      }
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      window.location.href = `/cbt-jawdal-ujian`;
      localStorage.removeItem("questions");
    }

    if (error) {
      toast.error(error.message || error.data.message);
    }
  }, [message, isSuccess, error]);

  return (
    <div className="container-fluid">
      <MetaData title={name.replace("-", " ")} />
      <Top name={user?.name} quizName={name} bankid={bankId} nis={user?.nis} />
      <div className="container-fluid my-2" style={{ height: "91vh" }}>
        <div className="row g-2" style={{ height: "100%" }}>
          <div className="col-lg-10 col-12">
            {/* CBT Timer */}
            <CbtTimer
              refresh={refreshQuestions}
              isLoading={isLoading}
              number={currentPage}
              time={time}
              log={log}
              bankid={bankId}
            />

            {/* Soal dan jawaban CBT */}
            {currentQuestions?.map((question, i) => (
              <CbtQuestions
                key={i}
                question={question}
                note={data?.note}
                answers={answers}
              />
            ))}

            <div className="d-flex align-items-center justify-content-between p-1 rounded shadow bg-white border border-2">
              <button
                className="btn btn-primary"
                onClick={() => handlePageChange(null, currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="bi bi-chevron-left"></i>
                Sebelumnya
              </button>

              {currentPage !==
              Math.ceil(questions.length / questionsPerPage) ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handlePageChange(null, currentPage + 1)}
                >
                  Selanjutnya
                  <i className="bi bi-chevron-right"></i>
                </button>
              ) : (
                <button
                  className="btn btn-danger"
                  disabled={fLoad ? true : false}
                  onClick={finishHandler}
                >
                  {fLoad ? "Loading..." : "Selesai"}
                </button>
              )}
            </div>
          </div>

          <div className="col-lg-2">
            <div
              style={{ height: "100%", overflow: "auto" }}
              className="rounded shadow bg-white p-2 border border-2"
            >
              <div className="d-flex gap-2 align-items-start flex-wrap justify-content-center">
                {questions?.map((item, index) => {
                  const ans = answers?.find((a) => a.question_id === item.id);
                  return (
                    <button
                      key={index}
                      style={{ width: 50 }}
                      className={`btn ${
                        ans?.doubt
                          ? `btn-warning`
                          : ans
                          ? `btn-success`
                          : `btn-danger`
                      }`}
                      onClick={() => handlePageChange(null, index + 1)}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CbtPage;
