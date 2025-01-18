import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { useAddTopicMutation } from "../../control/api/lmsApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";

const createMarkup = (html) => {
  return { __html: html };
};

const LmsChaptersList = ({ chapters, add }) => {
  const params = useParams();
  const { code } = params;

  const [goal, setGoal] = useState("");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
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

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", topicId);
    formData.append("title", title);
    formData.append("goal", goal);
    formData.append("chapter_id", chapterId);
    formData.append("subject_code", code);

    // Append files to FormData
    for (const file of files) {
      formData.append("files", file);
    }

    addTopic(formData);
  };

  useEffect(() => {
    if (aSuccess) {
      toast.success(msg.message);
      setChapterId("");
      setTitle("");
      setGoal("");
      setFiles([]);

      aReset();
    }

    if (aError) {
      toast.error(aError.data.message);
      aReset();
    }
  }, [msg, aSuccess, aError]);

  return (
    <div className="container-fluid">
      <div className="text-end rounded p-2 shadow bg-white mb-2">
        <button className="btn btn-info" onClick={add}>
          + Materi Pembelajaran
        </button>
      </div>
      <div className="d-flex flex-wrap gap-2">
        {chapters?.map((item, i) => (
          <div key={i} className="card shadow border border-info">
            <h5 className="card-header">{item.title}</h5>
            <div className="card-body">
              <h6 className="card-title">Tujuan Pembelajaran</h6>
              <p
                className="card-text"
                dangerouslySetInnerHTML={createMarkup(item.goal)}
              />

              <p className=" h6">Topik Pembelajaran</p>
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Accordion Item #1
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <strong>This is the first item's accordion body.</strong>{" "}
                      It is shown by default, until the collapse plugin adds the
                      appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-end p-2 border-top border-2 mt-3">
                <button
                  className="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#topic"
                  onClick={() => setChapterId(item.id)}
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
          <form className="modal-content" onSubmit={submitHandler}>
            <div className="modal-header">
              <h5 className="modal-title">Tambah Topik Pembelajaran</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
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

              <input
                type="file"
                name="files"
                id="file"
                className="form-control"
                multiple
                onChange={(e) => setFiles([...e.target.files])}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
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
