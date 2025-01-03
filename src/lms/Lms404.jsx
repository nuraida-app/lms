import React, { Fragment } from "react";

const Lms404 = () => {
  return (
    <Fragment>
      <div style={{ height: 450, width: 500 }}>
        <img
          src="/ilustration.jpg"
          alt="robot-not-found"
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <p className="h5 m-0">Belum Ada Materi Pembelajaran</p>
    </Fragment>
  );
};

export default Lms404;
