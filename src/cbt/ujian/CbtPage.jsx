import React, { Fragment } from "react";
import Top from "./Top";

const CbtPage = () => {
  return (
    <div className="container-fluid bg-white">
      <Top />
      <div className="row p-3" style={{ height: "86vh" }}>
        <div className="col-lg-5" style={{ height: "100%", overflow: "auto" }}>
          <img
            src="https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg"
            alt=""
            className="img-fluid rounded"
          />
        </div>
        <div className="col-lg-5">
          <div className="d-flex flex-column gap-3">
            <button className={`btn btn-outline-primary text-start`}>
              Jawaban A
            </button>

            <button className={`btn btn-outline-primary text-start`}>
              Jawaban A
            </button>

            <button className={`btn btn-outline-primary text-start`}>
              Jawaban A
            </button>

            <button className={`btn btn-outline-primary text-start`}>
              Jawaban A
            </button>

            <button className={`btn btn-outline-primary text-start`}>
              Jawaban A
            </button>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="d-flex flex-wrap gap-2 justify-content-center align-items-start">
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
  );
};

export default CbtPage;
