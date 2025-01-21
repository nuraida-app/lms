import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";
import LmsAddFile from "./LmsAddFile";
import ChapterCard from "./ChapterCard";
import TopicModal from "./TopicModal";
import { useAddTopicMutation } from "../../control/api/lmsApi";

const LmsChaptersList = ({ chapters, add, grades, setGrade, role }) => {
  const params = useParams();
  const { code, name } = params;

  const [goal, setGoal] = useState("");
  const [title, setTitle] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [type, setType] = useState("");

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

  const closeHandler = () => {
    setTopicId("");
    setTitle("");
    setGoal("");
  };

  const uploadHandler = (id, type) => {
    setTopicId(id);
    setType(type);
  };

  const addTopicHandler = (e) => {
    e.preventDefault();
    if (!title || !goal) return toast.error("Semua input harus diisi");
    const data = {
      id: topicId,
      title,
      goal,
      chapter_id: chapterId,
      subject_code: code,
    };
    addTopic(data);
  };

  useEffect(() => {
    if (aSuccess) {
      toast.success(msg.message);
      closeHandler();
      aReset();
    }
    if (aError) {
      toast.error(aError.data.message);
      aReset();
    }
  }, [aSuccess, aError]);

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between rounded p-2 shadow bg-white mb-2">
        <p className="m-0 h5">{name.replace("-", " ")}</p>
        {role !== "student" && (
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
        )}
        {role === "teacher" && (
          <button className="btn btn-info" onClick={add}>
            + Materi Pembelajaran
          </button>
        )}
      </div>
      <div className="d-flex flex-wrap gap-2">
        {chapters?.map((item) => (
          <ChapterCard
            key={item.chapter_id}
            chapter={item}
            role={role}
            uploadHandler={uploadHandler}
            setChapterId={setChapterId}
            setTopicId={setTopicId}
            setGoal={setGoal}
            setTitle={setTitle}
            add={add}
          />
        ))}
      </div>

      <LmsAddFile type={type} topicId={topicId} subjectCode={code} />
      <TopicModal
        title={title}
        setTitle={setTitle}
        goal={goal}
        setGoal={setGoal}
        aLoad={aLoad}
        addTopicHandler={addTopicHandler}
        closeHandler={closeHandler}
      />
    </div>
  );
};

export default LmsChaptersList;
