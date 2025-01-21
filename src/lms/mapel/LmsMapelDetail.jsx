import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import LmsAddChapter from "./LmsAddChapter";
import { useGetChaptersQuery } from "../../control/api/lmsApi";
import LmsChaptersList from "./LmsChaptersList";
import { useGetGradesQuery } from "../../control/api/gradeApi";
import { useSelector } from "react-redux";

const LmsMapelDetail = () => {
  const params = useParams();
  const { name, id, code } = params;

  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const [add, setAdd] = useState(false);
  const [gradeId, setGradeId] = useState("");

  const { data: grades, isLoading: gLoad } = useGetGradesQuery();
  const { data: chapters } = useGetChaptersQuery({
    grade_id: role === "student" ? user?.grade_id : gradeId,
    subjectCode: code,
  });

  return (
    <Layout title={name}>
      {!add && !chapters && (
        <div
          style={{ height: "calc(100vh - 90px)" }}
          className="d-flex flex-column gap-2 align-items-center"
        >
          <div
            style={{ height: "100%" }}
            className="container-fluid rounded shadow bg-white p-3 d-flex flex-column align-items-center gap-2"
          >
            <div style={{ height: "100%", width: 500 }}>
              <img
                src="/ilustration.jpg"
                alt="robot-not-found"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <p className="h5 m-0">Belum Ada Materi Pembelajaran</p>
            {role === "teacher" && (
              <button className="btn btn-info" onClick={() => setAdd(true)}>
                + Tambah Materi
              </button>
            )}
          </div>
        </div>
      )}

      {add && (
        <LmsAddChapter
          add={() => setAdd(false)}
          grades={grades}
          gLoad={gLoad}
        />
      )}

      {chapters && !add && (
        <LmsChaptersList
          chapters={chapters}
          add={() => setAdd(true)}
          grades={grades}
          setGrade={(e) => setGradeId(e)}
          role={user?.role}
        />
      )}
    </Layout>
  );
};

export default LmsMapelDetail;
