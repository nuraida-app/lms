import React, { useEffect, useState } from "react";
import { useGetJuzQuery } from "../../control/api/quranApi";
import { toast } from "react-toastify";
import { useGetTypesQuery } from "../../control/api/metricApi";
import { useGetExaminersQuery } from "../../control/api/examinerApi";

const Selects = ({
  typeId,
  setTypeId,
  examiner,
  setExaminer,
  surah,
  setSelectedSurah,
  setSelectedJuz,
  countAyat,
  fromAyat,
  setFromAyat,
  toAyat,
  setToAyat,
  countLine,
  fromLine,
  setFromLine,
  toLine,
  setToLine,
  addToTable,
  setTableData,
}) => {
  const page = "";
  const limit = "";
  const search = "";

  const { data: types } = useGetTypesQuery();
  const { data: examiners } = useGetExaminersQuery({ search });
  const { data } = useGetJuzQuery({ page, limit, search });

  const [surahList, setSurahList] = useState([]);

  const handleJuzChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const juz = data.find((item) => item.id === selectedId);

    if (juz.surah.length === 0) {
      toast.error("Data tidak tersedia");
      setSurahList([]);
    } else {
      setSelectedJuz(juz);
      setSurahList(juz.surah);
    }
  };

  const handleSurahBulk = (e) => {
    const selectedId = parseInt(e.target.value);
    const juz = data.find((item) => item.id === selectedId);

    if (juz.surah.length === 0) {
      toast.error("Data tidak tersedia");
      setTableData([]);
    } else {
      setSelectedJuz(juz);
      setTableData((prevData) => [
        ...prevData,
        ...juz.surah.map((item) => ({
          juzId: juz.id,
          fromSurah: item.surah_id,
          fromSurahName: item.surah,
          fromAyat: item.from_ayat,
          toAyat: item.to_ayat,
          fromLine: item.from_line,
          toLine: item.to_line,
        })),
      ]);
    }
  };

  const handleSurahChange = (e) => {
    const surahId = parseInt(e.target.value);
    const selected = surahList.find((s) => s.id === surahId);

    if (!selected) {
      toast.error("Surah tidak ditemukan!");
    } else {
      setSelectedSurah(selected);
    }
  };

  return (
    <div className="row g-2">
      <div className="col-lg-6 col-6">
        <select
          name="type"
          id="1"
          className="form-select"
          value={typeId || ""}
          onChange={(e) => setTypeId(e.target.value)}
        >
          <option value="" hidden>
            Jenis Penilaian
          </option>

          {types?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-lg-6 col-6">
        <select
          name="type"
          id="1"
          className="form-select"
          value={examiner || ""}
          onChange={(e) => setExaminer(e.target.value)}
        >
          <option value="" hidden>
            Penguji
          </option>

          {examiners?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12">
        <p className="m-0">Berdasarkan Juz</p>
      </div>

      <div className="col-lg-2 col-12">
        <select className="form-select" onChange={handleSurahBulk}>
          <option value="" hidden>
            Pilih Juz
          </option>
          {data?.map((juz) => (
            <option key={juz.id} value={juz.id}>
              {juz.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12">
        <p className="m-0">Berdasarkan Surah</p>
      </div>

      <div className="col-lg-2 col-6">
        <select className="form-select" onChange={handleJuzChange}>
          <option value="" hidden>
            Pilih Juz
          </option>
          {data?.map((juz) => (
            <option key={juz.id} value={juz.id}>
              {juz.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-lg-2 col-6">
        <select
          className="form-select"
          onChange={handleSurahChange}
          disabled={surahList.length === 0}
        >
          <option value="" hidden>
            Pilih Surah
          </option>
          {surahList?.map((surah) => (
            <option key={surah.id} value={surah.id}>
              {surah.surah} {/* Pastikan ini sesuai dengan struktur API */}
            </option>
          ))}
        </select>
      </div>
      <div className="col-lg-2 col-6">
        <select
          className="form-select"
          disabled={!countAyat}
          value={fromAyat}
          onChange={(e) => setFromAyat(e.target.value)}
        >
          <option value="" hidden>
            Dari Ayat
          </option>
          {Array.from(
            { length: surah.to_ayat - surah.from_ayat + 1 },
            (_, i) => surah.from_ayat + i
          ).map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>
      <div className="col-lg-2 col-6">
        <select
          className="form-select"
          disabled={!fromAyat}
          value={toAyat}
          onChange={(e) => setToAyat(e.target.value)}
        >
          <option value="" hidden>
            Sampai Ayat
          </option>
          {Array.from(
            { length: surah.to_ayat - surah.from_ayat + 1 },
            (_, i) => surah.from_ayat + i
          ).map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>
      <div className="col-lg-2 col-6">
        <select
          className="form-select"
          disabled={!toAyat}
          value={fromLine}
          onChange={(e) => setFromLine(e.target.value)}
        >
          <option value="" hidden>
            Dari Baris
          </option>
          {Array.from({ length: countLine }, (_, i) => i + 1).map((line) => (
            <option key={line} value={line}>
              {line}
            </option>
          ))}
        </select>
      </div>
      <div className="col-lg-2 col-6">
        <select
          className="form-select"
          disabled={!fromLine}
          value={toLine}
          onChange={(e) => setToLine(e.target.value)}
        >
          <option value="" hidden>
            Sampai Baris
          </option>
          {Array.from({ length: countLine }, (_, i) => i + 1).map((line) => (
            <option key={line} value={line}>
              {line}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 text-end">
        <button
          className="btn btn-primary"
          disabled={!toLine}
          onClick={addToTable}
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default Selects;
