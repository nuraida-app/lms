import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Chart from "./Chart";

const CenterDash = () => {
  const [type, setType] = useState("province");
  return (
    <Layout title={"Admin Pusat"}>
      <p className="h5 my-3 text-center">Data Demografi Peseta Didik</p>
      <select className="form-select" aria-label="Default select example">
        <option value="province">Provinsi</option>
        <option value="region">Kota / Kabupaten</option>
        <option value="district">Desa</option>
      </select>

      <Chart />
    </Layout>
  );
};

export default CenterDash;
