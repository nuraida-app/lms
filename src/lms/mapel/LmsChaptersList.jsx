import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { useAddTopicMutation } from "../../control/api/lmsApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";

const createMarkup = (html) => {
  return { __html: html };
};

const LmsChaptersList = ({ chapters, add, grades, setGrade }) => {
  const params = useParams();
  const { code } = params;

  const [goal, setGoal] = useState("");
  const [title, setTitle] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [topicId, setTopicId] = useState("");

  const [
    addTopic,
    {
      data: msg,
      isLoading: aLoad,
      isSuccess: aSuccess,
      error: aError,
      reset: aReset,
    },
  ] = useAddTopicMutation();

  const addTopicHandler = (e) => {
    e.preventDefault();

    if (!title || !goal) {
      return toast.error("Semua input harus diisi");
    }

    const formData = new FormData();
    formData.append("id", topicId);
    formData.append("title", title);
    formData.append("goal", goal);
    formData.append("chapter_id", chapterId);
    formData.append("subject_code", code);

    addTopic(formData);
  };

  useEffect(() => {
    if (aSuccess) {
      toast.success(msg.message);
      setTitle("");
      setGoal("");
      aReset();
    }

    if (aError) {
      toast.error(aError.data.message);
      aReset();
    }
  }, [msg, aSuccess, aError]);

  console.log(chapters);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between rounded p-2 shadow bg-white mb-2">
        <div className="d-flex gap-2">
          <button className="btn btn-secondary" onClick={() => setGrade("")}>
            Reset
          </button>
          {grades?.map((grade) => (
            <button
              key={grade.id}
              className="btn btn-secondary"
              onClick={() => setGrade(grade.id)}
            >
              {grade.grade}
            </button>
          ))}
        </div>
        <button className="btn btn-info" onClick={add}>
          + Materi Pembelajaran
        </button>
      </div>
      <div className="d-flex flex-wrap gap-2">
        {chapters?.map((item, i) => (
          <div key={i} className="w-100 card shadow border border-info">
            <div className="card-header">
              <h5>{item.chapter_title}</h5>
              <p className="m-0 fst-italic text-secondary">
                Tingkat <span>{item.grade_name}</span>
              </p>
              <p className="m-0 fst-italic text-secondary">
                Kelas <span>{item.class_names.join(", ")}</span>
              </p>
            </div>
            <div className="card-body">
              <h6 className="card-title">Tujuan Pembelajaran</h6>
              <p
                className="card-text"
                dangerouslySetInnerHTML={createMarkup(item.chapter_goal)}
              />

              <p className="h6">Topik Pembelajaran</p>
              <div className="d-flex flex-column gap-2">
                {item.topics?.map((t, i) => (
                  <>
                    <div
                      key={t.topic_id}
                      className="d-flex justify-content-between p-2 rounded border border-2"
                    >
                      <button
                        className="btn btn-outline-info text-start"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#topic-${t.topic_id}`}
                        aria-expanded="false"
                        aria-controls={`topic-${t.topic_id}`}
                        style={{ width: "40%" }}
                      >
                        {t.topic_title}
                      </button>

                      <div>
                        <button className="btn btn-secondary">File</button>
                        <button className="btn btn-secondary mx-2">
                          Video
                        </button>
                        <button className="btn btn-danger">Hapus</button>
                      </div>
                    </div>

                    <div className="collapse mt-2" id={`topic-${t.topic_id}`}>
                      <div className="card card-body">
                        <p>File 1</p>
                        <p>File 2</p>
                        <p>File 3</p>
                        <p>Video 1</p>
                      </div>
                    </div>
                  </>
                ))}
              </div>

              <div className="text-end p-2 border-top border-2 mt-3">
                <button
                  className="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#topic"
                  onClick={() => setChapterId(item.chapter_id)}
                >
                  + Topik
                </button>
                <button className="btn btn-warning mx-2">Edit</button>
                <button className="btn btn-danger">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="modal fade" id="topic" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content" onSubmit={addTopicHandler}>
            <div className="modal-header">
              <h5 className="modal-title">Tambah Topik Pembelajaran</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-column gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Topik Pembelajaran"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Editor
                placeholder={"Tujuan Pembelajaran"}
                value={goal}
                onChange={(html) => setGoal(html)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Batal
              </button>
              {aLoad ? (
                <BtnLoader />
              ) : (
                <button className="btn btn-primary" type="submit">
                  Simpan
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LmsChaptersList;
