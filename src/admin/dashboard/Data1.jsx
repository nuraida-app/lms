import React from "react";

const Data1 = ({ data }) => {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
      <div className="d-flex flex-column align-items-center justify-content-center gap-2 p-2 shadow rounded bg-white">
        <div
          style={{ height: 80, width: 80 }}
          className="rounded-circle bg-warning d-flex align-items-center justify-content-center"
        >
          <p className="m-0" style={{ fontSize: 30 }}>
            {data?.teachers}
          </p>
        </div>
        <p className="m-0 h6">Guru</p>
      </div>

      <div className="d-flex flex-column align-items-center justify-content-center gap-2 p-2 shadow rounded bg-white">
        <div
          style={{ height: 80, width: 80 }}
          className="rounded-circle bg-warning d-flex align-items-center justify-content-center"
        >
          <p className="m-0" style={{ fontSize: 30 }}>
            {data?.students}
          </p>
        </div>
        <p className="m-0 h6">Siswa</p>
      </div>
    </div>
  );
};

export default Data1;
