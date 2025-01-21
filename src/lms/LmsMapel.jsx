import React, { useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import { useGetSubjectsQuery } from "../control/api/subjectApi";
import { useNavigate } from "react-router-dom";

const LmsMapel = () => {
  const navigate = useNavigate();

  const page = "";
  const limit = "";
  const [search, setSearch] = useState("");

  const { data: rawData = {} } = useGetSubjectsQuery({ page, limit, search });
  const { subjects = [], total } = rawData;

  const goToLink = (name, code, id) => {
    const formatted = name.replace(/\s+/g, "-");
    navigate(`/lms-mapel/${id}/${formatted}/${code}`);
  };

  console.log(subjects);
  return (
    <Layout title={"Learning Management System"}>
      {/* <LmsList subjects={subjects} /> */}
      <div className="container-fluid">
        <div className="d-flex flex-column gap-2 bg-white rounded p-2">
          <p className="m-0 h6">
            Jumlah Mata Pelajaran: <span>{total}</span>
          </p>
          <input
            type="text"
            className="form-control"
            placeholder="Cari Mata Pelajaran"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="row g-2 mt-2">
          {subjects?.map((item, i) => (
            <div key={i} className="col-md-6">
              <div className="card bg-white shadow">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <p className="m-0 h5">{item.name}</p>

                  <button
                    className="btn btn-primary"
                    onClick={() => goToLink(item.name, item.code, item.id)}
                  >
                    Detail
                  </button>
                </div>
                <div className="card-body">
                  <div className="container-fluid">
                    <div className="row g-2">
                      <div className="col-lg-6 col-12">
                        <div className="border border-2 border-secondary rounded  p-2">
                          <h6 className="card-title">Tingkat</h6>
                          <p className="card-text">
                            {item.levelCounts.length > 0 ? (
                              item.levelCounts
                                .map((level) => level.level)
                                .join(", ")
                            ) : (
                              <span className="text-muted mt-2">
                                Data belum tersedia
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="border border-2 border-secondary rounded  p-2">
                          <h6 className="card-title">Kelas</h6>
                          <p className="card-text">
                            {item.levelCounts.length > 0 &&
                            item.levelCounts.some(
                              (level) => level.classes.length > 0
                            ) ? (
                              item.levelCounts
                                .flatMap((level) => level.classes)
                                .join(", ")
                            ) : (
                              <span className="text-muted mt-2">
                                Data belum tersedia
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {item.levelCounts.length > 0 ? (
                      <div className="table-responsive mt-2">
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th scope="col" className="text-center">
                                #
                              </th>
                              {item.levelCounts.map((level) => (
                                <th key={level.level} className="text-center">
                                  {level.level}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Bab</td>
                              {item.levelCounts.map((level) => (
                                <td key={level.level} className="text-center">
                                  {level.total_chapters}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Topik</td>
                              {item.levelCounts.map((level) => (
                                <td key={level.level} className="text-center">
                                  {level.total_topics}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-muted mt-2">Data belum tersedia</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LmsMapel;
