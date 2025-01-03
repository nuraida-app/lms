import React from "react";
import Editor from "./components/Editor";

const LmsAddChapter = () => {
  return (
    <form className="d-flex flex-column gap-2 rounded shadow p-3">
      <div className="input-group">
        <span className="input-group-text" id="basic-addon1">
          Materi Pembelajaran
        </span>
        <input type="text" className="form-control" aria-label="Username" />
      </div>

      <Editor placeholder={"Capaian Pembelajaran"} />
    </form>
  );
};

export default LmsAddChapter;
