import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { useGetClassByGradeQuery } from "../../control/api/classApi";
import { useAddChapterMutation } from "../../control/api/lmsApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";
import { useSelector } from "react-redux";

const LmsAddChapter = ({ add, grades, gLoad }) => {
  const params = useParams();
  const code = params.code;

  const { user } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [classIds, setClasses] = useState([]);
  const [gradeid, setGradeId] = useState("");
  const [id, setId] = useState("");

  const { data: classes, isLoading: cLoad } = useGetClassByGradeQuery(gradeid, {
    skip: !gradeid,
  });
  const [addChapter, { data, isLoading, isSuccess, error, reset }] =
    useAddChapterMutation();

  const classHandler = (id) => {
    setClasses((prev) =>
      prev.includes(id)
        ? prev.filter((classId) => classId !== id)
        : [...prev, id]
    );
  };
  const gradeHandler = (id) => {
    setClasses([]);
    setGradeId(id);
  };

  const addHandler = (e) => {
    e.preventDefault();

    if (!title || !goal || classIds.length === 0) {
      toast.error("Lengkapi form");
      return;
    }

    const data = {
      id: id ? id : "",
      code,
      title,
      classIds,
      gradeid,
      goal,
      teacher_id: user.id,
    };

    console.log(data);

    addChapter(data);
  };

  useEffect(() => {
    const editChapterData = localStorage.getItem("chapter");
    if (editChapterData) {
      const chapter = JSON.parse(editChapterData);
      setTitle(chapter.chapter_title);
      setGoal(chapter.chapter_goal);
      setClasses(chapter.class_codes || []);
      setGradeId(chapter.grade_id || "");
      setId(chapter.chapter_id);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      setTitle("");
      setGoal("");
      setClasses([]);
      add();
      localStorage.removeItem("chapter");
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  return (
    <form
      className="d-flex flex-column gap-1 rounded shadow p-2 bg-white"
      onSubmit={addHandler}
    >
      <div className="input-group">
        <span className="input-group-text" id="basic-addon1">
          Materi Pembelajaran
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Username"
          placeholder="Nama BAB"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <Editor
        placeholder={"Tujuan Pembelajaran"}
        value={goal}
        onChange={(html) => setGoal(html)}
      />

      <div className="d-flex flex-column gap-1">
        <p className="m-0 h6">Pilih Tingkat</p>
        {gLoad ? (
          <BtnLoader />
        ) : (
          <div className="d-flex flex-wrap gap-1">
            {grades?.map((g, i) => (
              <button
                key={i}
                type="button"
                className={`btn ${
                  gradeid == g.id ? "btn-success" : "btn-secondary"
                }`}
                onClick={() => gradeHandler(g.id)}
              >
                {g.grade}
              </button>
            ))}
          </div>
        )}
      </div>

      {classes && (
        <div className="d-flex flex-column gap-1">
          <p className="m-0 h6">Pilih Kelas</p>
          {cLoad ? (
            <BtnLoader />
          ) : (
            <div className="d-flex flex-wrap gap-1">
              {classes?.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  className={`btn ${
                    classIds.includes(c.code) ? "btn-success" : "btn-secondary"
                  }`}
                  onClick={() => classHandler(c.code)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <hr />
      <div className="text-end">
        <button className="btn btn-danger me-2" onClick={add}>
          Batal
        </button>
        {isLoading ? (
          <BtnLoader />
        ) : (
          <button className="btn btn-success" type="submit">
            Simpan
          </button>
        )}
      </div>
    </form>
  );
};

export default LmsAddChapter;
