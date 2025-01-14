import React from "react";

const CbtTimer = () => {
  return (
    <div className="d-flex align-items-center justify-content-between bg-white p-1 rounded shadow">
      <div className="d-flex gap-2">
        <button style={{ width: 50 }} className="btn btn-info">
          60
        </button>

        <button style={{ width: 50 }} className="btn btn-warning">
          <i className="bi bi-arrow-repeat"></i>
        </button>
      </div>

      <button className="btn btn-danger">10:10:10</button>
    </div>
  );
};

export default CbtTimer;
