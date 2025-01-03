import React, { useState } from "react";
import Layout from "./components/layout/Layout";
import Lms404 from "./Lms404";
import LmsAddChapter from "./LmsAddChapter";

const LmsMapel = () => {
  const [add, setAdd] = useState(false);
  return (
    <Layout>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-lg-3 col-12 d-flex flex-column gap-3 py-3">
          <button className="btn btn-warning">Bahasa Inggris</button>
        </div>
        <div className="col-lg-9 col-12 d-flex flex-column gap-3 py-3">
          <p className="m-0 h4">Kurikulum Pembelajaran</p>

          {/* {!add && (
            <div className="d-flex flex-column gap-2 align-items-center">
              <Lms404 />

              <button className="btn btn-info" onClick={() => setAdd(true)}>
                + Tambah Materi
              </button>
            </div>
          )} */}

          <LmsAddChapter />
        </div>
      </div>
    </Layout>
  );
};

export default LmsMapel;
