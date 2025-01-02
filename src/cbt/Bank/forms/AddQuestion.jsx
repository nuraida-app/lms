import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import Editor from "../../components/Editor";

const AddQuestion = () => {
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

  const handleChoiceChange = (choice) => (content) => {
    setChoices((prevChoices) => ({
      ...prevChoices,
      [choice]: content,
    }));
  };

  return (
    <Layout>
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
                name="type"
                id=""
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-control"
              >
                <option value={1}>PG</option>
                <option value={2}>Essay</option>
              </select>

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

              <input
                type="number"
                className="form-control"
                placeholder="Skor soal"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>

            <div className="text-end col-lg-6 col-12">
              <button className="btn btn-light">Simpan</button>
            </div>
          </div>

          <div className="container-fluid">
            <Editor
              placeholder="Ketikan pertanyaan di sini ..."
              value={value}
              onChange={(html) => setValue(html)}
            />

            <div className="input-group mb-3">
              <input
                type="file"
                className="form-control"
                id="inputGroupFile02"
              />
              <label className="input-group-text" htmlFor="inputGroupFile02">
                Upload
              </label>
            </div>

            {Object.keys(choices).map((choice, index) => (
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
