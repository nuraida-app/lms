import React from "react";
import TopicCard from "./TopicCard";
import BtnLoader from "../../components/loader/BtnLoader";

const createMarkup = (html) => ({ __html: html });

const ChapterCard = ({
  chapter,
  role,
  uploadHandler,
  setChapterId,
  setTopicId,
  setGoal,
  setTitle,
  add,
}) => {
  const handleEdit = () => {
    localStorage.setItem("chapter", JSON.stringify(chapter));
    add();
  };

  return (
    <div className="w-100 card shadow border border-info">
      <div className="card-header">
        <h5>{chapter.chapter_title}</h5>
        <p className="m-0 fst-italic text-secondary">{chapter.teacher_name}</p>
        <p className="m-0 fst-italic text-secondary">
          Tingkat <span>{chapter.grade_name}</span>
        </p>
        <p className="m-0 fst-italic text-secondary">
          Kelas <span>{chapter.class_names.join(", ")}</span>
        </p>
      </div>
      <div className="card-body">
        <h6 className="card-title">Tujuan Pembelajaran</h6>
        <p
          className="card-text"
          dangerouslySetInnerHTML={createMarkup(chapter.chapter_goal)}
        />
        <p className="h6">Topik Pembelajaran</p>
        <div className="d-flex flex-column gap-2">
          {chapter.topics?.map((topic) => (
            <TopicCard
              key={topic.topic_id}
              topic={topic}
              role={role}
              uploadHandler={uploadHandler}
              setGoal={setGoal}
              setTitle={setTitle}
              setChapterId={setChapterId}
              setTopicId={setTopicId}
            />
          ))}
        </div>

        {role === "teacher" && (
          <div className="text-end p-2 border-top border-2 mt-3">
            <button
              className="btn btn-info"
              data-bs-toggle="modal"
              data-bs-target="#topic"
              onClick={() => setChapterId(chapter.chapter_id)}
            >
              + Topik
            </button>
            <button className="btn btn-warning mx-2" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-danger">Hapus</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterCard;
