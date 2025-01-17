import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
} from "../../../control/api/questionApi";
import BtnLoader from "../../../components/loader/BtnLoader";
import { toast } from "react-toastify";

const createMarkup = (html) => {
  return { __html: html };
};

const ListQuestions = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { name, bankid } = params;

  const { data } = useGetQuestionsQuery(bankid, { skip: !bankid });
  const [deleteQuestion, { data: msg, isSuccess, isLoading, error, reset }] =
    useDeleteQuestionMutation();

  const mc = data?.filter((d) => d.type === 1);
  const essay = data?.filter((d) => d.type === 2);

  const goToLink = () =>
    navigate(`/cbt-bank-soal/${name}/tambah-soal/${bankid}`);

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();
      window.location.reload();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [msg, isSuccess, error]);

  return (
    <Layout title={"Daftar Soal"}>
      <div
        className="container-fluid bg-light d-flex flex-column gap-4"
        style={{ maxHeight: "calc(100vh - 70px)", overflow: "auto" }}
      >
        <div className="d-flex flex-wrap align-items-center justify-content-lg-between justify-content-center">
          <div>
            <p className="m-0 text-center text-sm-start">
              Bank Soal : <span>{name.replaceAll("-", " ")}</span>
            </p>
            <p className="m-0">
              Komposisi: <span>{mc?.length}</span> PG,{" "}
              <span>{essay?.length}</span> Essay
            </p>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-info">Template</button>
            <button className="btn btn-primary">Upload</button>
            <button className="btn btn-success" onClick={goToLink}>
              Tambah
            </button>
            <button className="btn btn-danger">Kosongkan</button>
          </div>
        </div>

        {mc?.map((item, i) => (
          <div key={i} className="row g-1 rounded shadow p-2 border border-sm">
            {/* soal */}
            <div className="col-lg-10 col-12 d-flex flex-column gap-1">
              <div className="d-flex gap-2">
                <p className="m-0 fw-bold">{`${i + 1}.`}</p>
                <div dangerouslySetInnerHTML={createMarkup(item.question)} />
              </div>

              {item.choices.map(
                (a, i) =>
                  a.text !== null && (
                    <div key={i} className="d-flex gap-2 ms-4">
                      <p
                        className={`m-0 ${
                          a.value === item.key ? "fw-bold" : ""
                        }`}
                      >
                        {`${a.value}.`}
                      </p>
                      <p
                        className={`m-0 ${
                          a.value === item.key ? "fw-bold" : ""
                        }`}
                        dangerouslySetInnerHTML={createMarkup(a.text)}
                      />
                    </div>
                  )
              )}
              <p className="m-0 ms-4 text-primary fw-bold">{`Jawaban : ${item.key}`}</p>
              <p className="m-0 ms-4 text-primary fw-bold">{`Nilai : ${item.score}`}</p>
            </div>
            {/* Buttons */}
            <div className="col-lg-2 col-12">
              <div className="d-flex flex-column gap-2">
                <button className="btn btn-warning">Edit</button>
                {isLoading ? (
                  <BtnLoader />
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteQuestion(item.id)}
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {essay?.map((item, i) => (
          <div key={i} className="row g-1 rounded shadow p-2 border border-sm">
            <div className="col-lg-10 col-12">
              <div className="d-flex gap-2">
                <p className="m-0 fw-bold">{`${mc?.length + i + 1}.`}</p>
                <div dangerouslySetInnerHTML={createMarkup(item.question)} />
              </div>
            </div>
            <div className="col-lg-2 col-12">
              <div className="d-flex flex-column gap-2">
                <button className="btn btn-warning">Edit</button>
                {isLoading ? (
                  <BtnLoader />
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteQuestion(item.id)}
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ListQuestions;
