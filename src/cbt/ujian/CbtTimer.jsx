import React from "react";

const CbtTimer = ({ refresh, isLoading, number }) => {
  const handleSync = () => {
    localStorage.removeItem("questions");

    refresh();
  };
  return (
    <div className="d-flex align-items-center justify-content-between bg-white p-1 rounded shadow border border-2">
      <div className="d-flex gap-2">
        <button style={{ width: 50 }} className="btn btn-info">
          {number}
        </button>

        <button
          style={{ width: 50 }}
          className="btn btn-warning"
          onClick={handleSync}
          disabled={isLoading ? true : false}
        >
          <i className="bi bi-arrow-repeat"></i>
        </button>
      </div>

      <button className="btn btn-danger">10:10:10</button>
    </div>
  );
};

export default CbtTimer;
