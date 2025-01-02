import React from "react";
import Layout from "../../components/Layout";
import CbtLogs from "./CbtLogs";

const CbtReport = () => {
  return (
    <Layout>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-12">
          <div className="d-flex justify-content-end gap-2 p-2 rounded shadow mb-2">
            <button className="btn btn-warning">Perbarui Data</button>
            <button className="btn btn-info">Log</button>
            <button className="btn btn-info">Pilhan Ganda</button>
            <button className="btn btn-info">Uraian</button>
            <button className="btn btn-info">Nilai</button>
          </div>

          <div
            style={{
              height: "calc(100vh - 150px)",
              overflow: "auto",
            }}
            className="rounded shadow"
          >
            <CbtLogs />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CbtReport;
