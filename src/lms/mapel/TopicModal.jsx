import React from "react";
import Editor from "../components/Editor";

const TopicModal = ({
  title,
  setTitle,
  goal,
  setGoal,
  aLoad,
  addTopicHandler,
  closeHandler,
}) => {
  return (
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
              onClick={closeHandler}
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
              onChange={setGoal}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeHandler}
            >
              Batal
            </button>
            {aLoad ? (
              <button className="btn btn-primary" disabled>
                Loading...
              </button>
            ) : (
              <button className="btn btn-primary" type="submit">
                Simpan
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopicModal;
