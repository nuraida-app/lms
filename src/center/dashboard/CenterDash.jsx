import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Chart from "./Chart";

const CenterDash = () => {
  const [type, setType] = useState("provinces");

  return (
    <Layout title={"Admin Pusat"}>
      <p className="h5 my-3 text-center">Data Demografi Peseta Didik</p>
      <select
        className="form-select border border-2"
        aria-label="Default select example"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="provinces">Provinsi</option>
        <option value="regencies">Kota / Kabupaten</option>
        <option value="districts">Kecamatan</option>
        <option value="villages">Desa</option>
      </select>

      <Chart type={type} />
    </Layout>
  );
};

export default CenterDash;
