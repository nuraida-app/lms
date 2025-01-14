import React from "react";

const BtnLoader = () => {
  return (
    <button className="btn btn-light" type="button" disabled>
      <span
        className="spinner-border spinner-border-sm"
        aria-hidden="true"
      ></span>
      <span role="status">Loading...</span>
    </button>
  );
};

export default BtnLoader;
