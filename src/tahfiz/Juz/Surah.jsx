import React, { useState } from "react";
import { useGetJuzQuery, useGetQuranQuery } from "../../control/api/quranApi";

const Surah = ({ detail, close }) => {
  const page = "";
  const limit = "";
  const search = "";

  const [juzId, setJuzId] = useState("");
  const [surahId, setSurahId] = useState("");
  const [fromAyat, setFromAyat] = useState("");
  const [toAyat, setToAyat] = useState("");

  const { data: juz } = useGetJuzQuery({ page, limit, search });
  const { data: surah } = useGetQuranQuery({ page, limit, search });

  console.log(surahId);

  const getAyatOptions = (id) => {
    const selectedSurah = surah?.find((surah) => surah.id === parseInt(id));
    return selectedSurah
      ? Array.from({ length: selectedSurah.ayat }, (_, i) => i + 1)
      : [];
  };

  return (
    <form className="mt-2 rounded border border-2 bg-white p-2 d-flex flex-column gap-2">
      <p className="h6 m-0">Tambah Surah</p>

      <select
        name="juz"
        id="juz"
        className="form-select"
        required
        value={juzId}
        onChange={(e) => setJuzId(e.target.value)}
      >
        <option value="" hidden>
          Pilih Juz
        </option>

        {juz?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        name="surah"
        id="surah"
        className="form-select"
        required
        value={surahId}
        onChange={(e) => setSurahId(e.target.value)}
      >
        <option value="" hidden>
          Pilih Surah
        </option>
        {surah?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        className="form-select"
        value={fromAyat}
        onChange={(e) => setFromAyat(e.target.value)}
        disabled={!surahId}
      >
        <option value="" hidden>
          Dari Ayat
        </option>
        {getAyatOptions(surahId).map((ayat) => (
          <option key={ayat} value={ayat}>
            {ayat}
          </option>
        ))}
      </select>

      <select
        className="form-select"
        value={toAyat}
        onChange={(e) => setToAyat(e.target.value)}
        disabled={!surahId}
      >
        <option value="" hidden>
          Sampai Ayat
        </option>
        {getAyatOptions(surahId).map((ayat) => (
          <option key={ayat} value={ayat}>
            {ayat}
          </option>
        ))}
      </select>
    </form>
  );
};

export default Surah;
