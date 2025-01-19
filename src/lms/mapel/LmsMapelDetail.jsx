import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import LmsAddChapter from "./LmsAddChapter";
import { useGetChaptersQuery } from "../../control/api/lmsApi";
import LmsChaptersList from "./LmsChaptersList";
import { useGetGradesQuery } from "../../control/api/gradeApi";

const LmsMapelDetail = () => {
  const params = useParams();
  const { name, id, code } = params;

  const [add, setAdd] = useState(false);
  const [gradeId, setGradeId] = useState("");

  const { data: grades, isLoading: gLoad } = useGetGradesQuery();
  const { data: chapters } = useGetChaptersQuery({
    grade_id: gradeId,
    subjectCode: code,
  });

  return (
    <Layout title={name}>
      {!add && !chapters && (
        <div className="d-flex flex-column gap-2 align-items-center">
          <div className="container-fluid rounded shadow bg-white p-3 d-flex flex-column align-items-center gap-2">
            <div style={{ height: 430, width: 500 }}>
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
            <button className="btn btn-info" onClick={() => setAdd(true)}>
              + Tambah Materi
            </button>
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
        />
      )}
    </Layout>
  );
};

export default LmsMapelDetail;
