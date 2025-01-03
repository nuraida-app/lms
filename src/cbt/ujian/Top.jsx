import React from "react";

const Top = () => {
  return (
    <div
      style={{ height: "7vh" }}
      className="bg-primary text-white row d-flex align-items-center"
    >
      <div className="col-lg-4 col-6">
        <p className="m-0 text-center">Nama Siswa</p>
      </div>
      <div className="col-lg-4 col-6">
        <p className="m-0 text-center">Nama Ujian</p>
      </div>
      <div className="col-lg-4 col-12">
        <p className="m-0 text-center">
          <button className="btn btn-warning">10:10:10</button>
        </p>
      </div>
    </div>
  );
};

export default Top;
