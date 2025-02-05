import React, { useEffect, useState } from "react";
import FileCard from "./FileCard";
import Player from "./Player";
import { useDeleteTopicMutation } from "../../control/api/lmsApi";
import { toast } from "react-toastify";

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
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const [deleteTopic, { data, isSuccess, isLoading, error, reset }] =
    useDeleteTopicMutation();

  const handleEdit = () => {
    setTopicId(topic.topic_id);
    setTitle(topic.topic_title);
    setChapterId(topic.topic_chapter);
    setGoal(topic.goal);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

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
            <button
              className="btn btn-danger"
              disabled={isLoading ? true : false}
              onClick={() => deleteTopic(topic.topic_id)}
            >
              {isLoading ? "Loading..." : "Hapus"}
            </button>
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
          <FileCard files={topic.files} />
        </div>
      </div>

      <Player />
    </div>
  );
};

export default TopicCard;
