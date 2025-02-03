import React, { useEffect, useState } from "react";
import {
  useCreateAnswerMutation,
  useDoubtAnswerMutation,
} from "../../control/api/answerApi";
import { toast } from "react-toastify";
import Editor from "../components/Editor";

const createMarkup = (html) => {
  return { __html: html };
};

const CbtQuestions = ({ question, note, answers }) => {
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [value, setValue] = useState("");
  const [createAnswer, { data, isSuccess, error, reset }] =
    useCreateAnswerMutation();
  const [doubtAnswer, { data: message, isSuccess: dSuccess, error: dError }] =
    useDoubtAnswerMutation();
  const answer = answers?.find((a) => a.question_id === question?.id);

  console.log(answer);

  const pg = question?.type === 1;
  const essay = question?.type === 2;

  const choiceHandler = (value) => {
    const data = {
      quizId: question?.quiz_id,
      questionId: question?.id,
      type: question?.type,
      mc: value,
      poin: question?.score,
    };

    createAnswer(data);
  };

  const doubtHandler = () => {
    const data = {
      quizId: question?.quiz_id,
      questionId: question?.id,
    };

    doubtAnswer(data);
  };

  const handleEssay = () => {
    if (value === "") {
      return toast.warning("Jawaban essay tidak ada");
    }

    const data = {
      quizId: question?.quiz_id,
      questionId: question?.id,
      type: question?.type,
      essay: value,
      poin: question?.score,
    };

    createAnswer(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setValue("");
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (dSuccess) {
      toast.info(message.message);
    }

    if (dError) {
      toast.error(dError.data.message);
    }
  }, [message, dSuccess, dError]);

  useEffect(() => {
    if (note?.shuffle) {
      const shuffled = [...(question?.choices || [])].sort(
        () => Math.random() - 0.5
      );
      setShuffledChoices(shuffled);
    } else {
      setShuffledChoices(question?.choices || []);
    }
  }, [note, question]);

  return (
    <div className="row my-3" style={{ height: "calc(100vh - 200px)" }}>
      <div
        className="col-lg-5 col-12"
        style={{ height: "100%", overflow: "auto" }}
      >
        {pg && (
          <div className="p-2 h-100 border border-2 rounded shadow bg-white d-flex flex-column gap-3">
            {shuffledChoices
              ?.filter((item) => item.text !== "")
              .map((c, i) => (
                <div
                  key={i}
                  className="d-flex gap-2 py-2 px-1 rounded border border-2"
                  onClick={() => choiceHandler(c.value)}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    className="form-check-input m-0"
                    checked={answer?.mc === c.value ? true : false}
                    readOnly
                  />

                  <p
                    className="m-0"
                    dangerouslySetInnerHTML={createMarkup(c.text)}
                  ></p>
                </div>
              ))}

            <button
              className={`btn ${
                answer?.doubt ? `btn-warning` : `btn-outline-warning`
              } text-start `}
              onClick={doubtHandler}
            >
              Ragu Ragu
            </button>
          </div>
        )}

        {essay && (
          <div className="d-flex flex-column gap-2">
            <Editor
              placeholder="Ketikan jawaban di sini"
              value={answer?.essay || value}
              onChange={(html) => setValue(html)}
            />

            <button className="btn btn-primary" onClick={handleEssay}>
              Simpan
            </button>
          </div>
        )}
      </div>

      <div
        className="col-lg-7 col-12"
        style={{ height: "100%", overflow: "auto" }}
      >
        <div className="p-2 rounded shadow bg-white border border-2">
          <div
            className="p-4"
            dangerouslySetInnerHTML={createMarkup(question?.question)}
          />
        </div>
      </div>
    </div>
  );
};

export default CbtQuestions;
