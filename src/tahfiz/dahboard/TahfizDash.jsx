import React, { useState } from "react";
import Layout from "../components/Layout";
import Juz from "./Juz";

const columns = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama Lengkap" },
  { label: "Tingkat" },
  { label: "Kelas" },
  { label: "Aksi" },
];

const TahfizDash = () => {
  return (
    <Layout title={"Administrator Tahfiz"}>
      <div style={{ height: "calc(100vh - 70px)", overflow: "auto" }}>
        <Juz />
      </div>
    </Layout>
  );
};

export default TahfizDash;
