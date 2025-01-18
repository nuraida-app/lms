import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import {
  useClearDataMutation,
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
} from "../../../control/api/questionApi";
import BtnLoader from "../../../components/loader/BtnLoader";
import { toast } from "react-toastify";
import ReactAudioPlayer from "react-audio-player";
import Upload from "./Upload";

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
  const [
    clearData,
    {
      data: clear,
      isSuccess: isClear,
      isLoading: clearLoaading,
      error: clearError,
      reset: clearReset,
    },
  ] = useClearDataMutation();

  const mc = data?.filter((d) => d.type === 1);
  const essay = data?.filter((d) => d.type === 2);

  const goToLink = () =>
    navigate(`/cbt-bank-soal/${name}/tambah-soal/${bankid}`);

  const editLink = (id) =>
    navigate(`/cbt-bank-soal/${name}/tambah-soal/${bankid}/${id}`);

  const download = () => window.open("/temp/soal_template.xlsx", "_blank");

  const remove = () => {
    const confirm = window.confirm(
      "Apakah anda yakin akan mengahpus semua pertanyaan?"
    );

    if (confirm) {
      clearData(bankid);
    }
  };

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

  useEffect(() => {
    if (isClear) {
      toast.success(clear.message);
      reset();
      window.location.reload();
    }

    if (clearError) {
      toast.error(clearError.data.message);
      reset();
    }
  }, [clear, isClear, clearError]);

  return (
    <Layout title={"Daftar Soal"}>
      <div
        className="container-fluid bg-light d-flex flex-column gap-4"
        style={{ maxHeight: "calc(100vh - 70px)", overflow: "auto" }}
      >
        <div className="d-flex flex-wrap align-items-center justify-content-lg-between justify-content-center rounded bg-white shadow p-2">
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
            <button className="btn btn-info" onClick={download}>
              Template
            </button>
            <Upload />
            <button className="btn btn-success" onClick={goToLink}>
              Tambah
            </button>
            {clearLoaading ? (
              <BtnLoader />
            ) : (
              <button className="btn btn-danger" onClick={remove}>
                Kosongkan
              </button>
            )}
          </div>
        </div>

        {mc?.map((item, i) => (
          <div
            key={i}
            className="row g-1 rounded shadow p-2 border border-sm bg-white"
          >
            {/* soal */}
            <div className="col-lg-10 col-12 d-flex flex-column gap-1">
              <div className="d-flex gap-2">
                <p className="m-0 fw-bold">{`${i + 1}.`}</p>
                <div dangerouslySetInnerHTML={createMarkup(item.question)} />
                {item.audio && <ReactAudioPlayer src={item.audio} controls />}
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
                <button
                  className="btn btn-warning"
                  onClick={() => editLink(item.id)}
                >
                  Edit
                </button>
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
          <div
            key={i}
            className="row g-1 rounded shadow p-2 border border-sm bg-white"
          >
            <div className="col-lg-10 col-12">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex gap-2">
                  <p className="m-0 fw-bold">{`${mc?.length + i + 1}.`}</p>
                  <div dangerouslySetInnerHTML={createMarkup(item.question)} />
                </div>
                <p className="m-0 ms-4 text-primary fw-bold">{`Nilai : ${item.score}`}</p>
              </div>
            </div>
            <div className="col-lg-2 col-12">
              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-warning"
                  onClick={() => editLink(item.id)}
                >
                  Edit
                </button>
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
