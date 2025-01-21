import React from "react";
import FileCard from "./FileCard";

const createMarkup = (html) => ({ __html: html });

const TopicCard = ({
  topic,
  role,
  uploadHandler,
  setGoal,
  setTitle,
  setChapterId,
  setTopicId,
}) => {
  const handleEdit = () => {
    setTopicId(topic.topic_id);
    setTitle(topic.topic_title);
    setChapterId(topic.topic_chapter);
    setGoal(topic.goal);
  };

  const fileHandler = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div>
      <div className="d-flex justify-content-between p-2 rounded border border-2">
        <button
          className="btn btn-outline-info text-start"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#topic-${topic.topic_id}`}
          aria-expanded="false"
          aria-controls={`topic-${topic.topic_id}`}
          style={{ width: "40%" }}
        >
          {topic.topic_title}
        </button>
        {role === "teacher" && (
          <div className="d-flex gap-2">
            <button
              data-bs-toggle="modal"
              data-bs-target="#upload"
              className="btn btn-secondary"
              onClick={() => uploadHandler(topic.topic_id, "file")}
            >
              File
            </button>
            <button
              data-bs-toggle="modal"
              data-bs-target="#upload"
              className="btn btn-secondary"
              onClick={() => uploadHandler(topic.topic_id, "video")}
            >
              Video
            </button>
            <button
              className="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#topic"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button className="btn btn-danger">Hapus</button>
          </div>
        )}
      </div>
      <div className="collapse mt-2" id={`topic-${topic.topic_id}`}>
        <div className="card card-body">
          <p
            className="text-muted fst-italic"
            dangerouslySetInnerHTML={createMarkup(topic.goal)}
          />
          {/* FileCard Component Integration */}
          <FileCard files={topic.files} fileHandler={fileHandler} />
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
