import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import Editor from "../../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateQuestionMutation,
  useGetQuestionQuery,
} from "../../../control/api/questionApi";
import { toast } from "react-toastify";
import BtnLoader from "../../../components/loader/BtnLoader";
import ReactAudioPlayer from "react-audio-player";

const AddQuestion = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { name, bankid, questionid } = params;

  const [type, setType] = useState(1);
  const [value, setValue] = useState("");
  const [choices, setChoices] = useState({
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    choiceE: "",
  });
  const [score, setScore] = useState("");
  const [key, setKey] = useState("default");
  const [audio, setAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");

  const [createQuestion, { data, isSuccess, isLoading, error, reset }] =
    useCreateQuestionMutation();
  const { data: detail } = useGetQuestionQuery(questionid, {
    skip: !questionid,
  });

  const handleChoiceChange = (choice) => (content) => {
    setChoices((prevChoices) => ({
      ...prevChoices,
      [choice]: content,
    }));
  };

  const handleAudio = (e) => {
    const file = e.target.files[0];
    setAudio(file);
    setAudioUrl(URL.createObjectURL(file));
  };

  const addhandler = () => {
    if (!value) {
      toast.error("Please give question");
      return;
    }

    if (type === 1 && !key) {
      toast.error("Please give answer key");
      return;
    }

    if (type === 1 && !score) {
      toast.error("Please give score");
      return;
    }

    const formData = new FormData();
    formData.append("id", questionid || "");
    formData.append("type", type);
    formData.append("quiz_id", bankid);
    formData.append("question", value);
    formData.append("a", choices.choiceA || "");
    formData.append("b", choices.choiceB || "");
    formData.append("c", choices.choiceC || "");
    formData.append("d", choices.choiceD || "");
    formData.append("e", choices.choiceE || "");
    formData.append("key", key || "");
    formData.append("score", score || 0);

    if (audio) {
      formData.append("audio", audio);
    }

    createQuestion(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setType(1);
      setValue("");
      setChoices({
        choiceA: "",
        choiceB: "",
        choiceC: "",
        choiceD: "",
        choiceE: "",
      });
      setScore("");
      reset();
      window.location.href = `/cbt-bank-soal/${name}/${bankid}`;
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, name, bankid]);

  useEffect(() => {
    if (detail) {
      setType(detail.type || 1);
      setValue(detail.question || "");
      setChoices({
        choiceA: detail.a || "",
        choiceB: detail.b || "",
        choiceC: detail.c || "",
        choiceD: detail.d || "",
        choiceE: detail.e || "",
      });
      setScore(detail.score || "");
      setKey(detail.key || "default");
      setAudioUrl(detail.audio || "");
    }
  }, [detail]);

  console.log(detail);

  return (
    <Layout title={"Buat Pertanyaan"}>
      <div
        className="row"
        style={{ maxHeight: "calc(100vh - 75px)", overflow: "auto" }}
      >
        <div className="col-12 d-flex align-items-start flex-column gap-3">
          <div
            style={{
              top: 0,
              left: 10,
              zIndex: 1000,
            }}
            className="container-fluid bg-primary row d-flex justify-content-between p-2 shadow rounded position-sticky"
          >
            <div className="col-lg-6 col-12 d-flex gap-2">
              <select
                name="number"
                id=""
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-control"
              >
                <option value={1}>PG</option>
                <option value={2}>Essay</option>
              </select>

              {type == 1 && (
                <select
                  name="answer"
                  id=""
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="form-control"
                >
                  <option value={"A"}>A</option>
                  <option value={"B"}>B</option>
                  <option value={"C"}>C</option>
                  <option value={"D"}>D</option>
                  <option value={"E"}>E</option>
                </select>
              )}

              <input
                type="number"
                className="form-control"
                placeholder="Skor Soal"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>

            <div className="text-end col-lg-6 col-12">
              {isLoading ? (
                <BtnLoader />
              ) : (
                <button className="btn btn-light" onClick={addhandler}>
                  Simpan
                </button>
              )}
            </div>
          </div>

          <div className="container-fluid">
            <Editor
              placeholder="Ketikan pertanyaan di sini ..."
              value={value}
              onChange={(html) => setValue(html)}
            />

            {!audioUrl && (
              <div className="input-group mb-3 pointer">
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile02"
                  accept="audio/mp3"
                  onChange={handleAudio}
                />
                <label
                  className="input-group-text pointer"
                  htmlFor="inputGroupFile02"
                >
                  Upload Audio
                </label>
              </div>
            )}

            {audioUrl && (
              <div className="text-end">
                <ReactAudioPlayer src={audioUrl} controls />
              </div>
            )}

            {type == 1 &&
              Object.keys(choices).map((choice, index) => (
                <Editor
                  key={index}
                  placeholder={`Jawaban ${choice.charAt(choice.length - 1)}`}
                  value={choices[choice]}
                  onChange={handleChoiceChange(choice)}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddQuestion;
