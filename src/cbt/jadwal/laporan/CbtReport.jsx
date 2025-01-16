import React, { useRef, useState } from "react";
import Layout from "../../components/Layout";
import CbtLogs from "./CbtLogs";
import CbtMc from "./CbtMc";
import CbtEssay from "./CbtEssay";
import CbtScore from "./CbtScore";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";

const CbtReport = () => {
  const params = useParams();
  const tableRef = useRef(null);

  const [component, setComponent] = useState("log");

  const convertToExcel = () => {
    if (tableRef.current) {
      const workbook = XLSX.utils.book_new();
      const table = tableRef.current;
      const tableData = XLSX.utils.table_to_sheet(table);

      XLSX.utils.book_append_sheet(workbook, tableData, "Sheet1");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const fileName = `${component}_${params.name}.xlsx`;

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(data, fileName);
      } else {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(data);
        link.download = fileName;
        link.click();
      }
    }
  };

  return (
    <Layout title={`Laporan Ujian ${params.name}`}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-12">
          <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 p-2 rounded shadow mb-2">
            <button className="btn btn-warning">Perbarui Data</button>
            <button
              className="btn btn-info"
              onClick={() => setComponent("log")}
            >
              Log
            </button>
            <button className="btn btn-info" onClick={() => setComponent("pg")}>
              Pilhan Ganda
            </button>
            <button
              className="btn btn-info"
              onClick={() => setComponent("uraian")}
            >
              Uraian
            </button>
            <button
              className="btn btn-info"
              onClick={() => setComponent("nilai")}
            >
              Nilai
            </button>

            <button className="btn btn-success" onClick={convertToExcel}>
              Unduh Data
            </button>
          </div>

          <div
            style={{
              height: "calc(100vh - 150px)",
              overflow: "auto",
            }}
            className="rounded shadow"
          >
            {component === "log" && <CbtLogs tableRef={tableRef} />}
            {component === "pg" && <CbtMc tableRef={tableRef} />}
            {component === "uraian" && <CbtEssay tabelRef={tableRef} />}
            {component === "nilai" && <CbtScore tableRef={tableRef} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CbtReport;
