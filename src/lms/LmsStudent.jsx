import React from "react";
import Layout from "./components/layout/Layout";
import { useGetSubjectsClassQuery } from "../control/api/subjectApi";
import { useNavigate } from "react-router-dom";

const LmsStudent = () => {
  const navigate = useNavigate();

  const { data: subjects } = useGetSubjectsClassQuery();

  console.log(subjects);

  const goToLink = (name, code, id) => {
    const formatted = name.replace(/\s+/g, "-");
    navigate(`/lms-mapel/${id}/${formatted}/${code}`);
  };
  return (
    <Layout title={"Halaman Siswa"}>
      <div className="container-fluid">
        <div className="row">
          {subjects?.map((item, i) => (
            <div key={i} className="col-md-4 col-12">
              <div className="card shadow border border-2">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="m-0">{item.subject_name}</h5>

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      goToLink(item.subject_name, item.code, item.id)
                    }
                  >
                    Detail
                  </button>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.teacher_name}</h5>
                  <p className="card-text m-0">{`Bab ${item.total_chapters}`}</p>
                  <p className="card-text m-0">{`Topik ${item.total_topics}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LmsStudent;
