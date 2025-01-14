import React, { Fragment } from "react";
import Top from "./Top";
import CbtQuestions from "./CbtQuestions";
import CbtTimer from "./CbtTimer";

const CbtPage = () => {
  return (
    <div className="container-fluid">
      <Top />
      <div className="container-fluid my-2" style={{ height: "91vh" }}>
        <div className="row" style={{ height: "100%" }}>
          <div className="col-lg-10 col-12">
            {/* CBT Timer */}
            <CbtTimer />

            {/* Soal dan jawaban CBT */}
            <CbtQuestions />

            <div className="d-flex align-items-center justify-content-between p-1 rounded shadow bg-white">
              <button className="btn btn-primary">
                <i class="bi bi-chevron-left"></i>
                Sebelumnya
              </button>

              <button className="btn btn-primary">
                Selanjutnya
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="col-lg-2">
            <div
              style={{ height: "100%", overflow: "auto" }}
              className="rounded shadow bg-white p-2"
            >
              <div className="d-flex flex-wrap gap-1 align-items-start ">
                <button style={{ width: 50 }} className="btn btn-danger">
                  60
                </button>
                <button style={{ width: 50 }} className="btn btn-danger">
                  60
                </button>{" "}
                <button style={{ width: 50 }} className="btn btn-danger">
                  60
                </button>{" "}
                <button style={{ width: 50 }} className="btn btn-danger">
                  60
                </button>{" "}
                <button style={{ width: 50 }} className="btn btn-danger">
                  60
                </button>{" "}
                <button style={{ width: 50 }} className="btn btn-danger">
                  60
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CbtPage;
