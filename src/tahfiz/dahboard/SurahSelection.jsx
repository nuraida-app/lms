import React from "react";

const SurahSelection = ({
  surahs,
  fromSurah,
  setFromSurah,
  fromAyat,
  setFromAyat,
  toAyat,
  setToAyat,
  getAyatOptions,
  handleAddToTable,
}) => (
  <div className="row g-2 ">
    <div className="col-md-3 col-12">
      <select
        className="form-select"
        value={fromSurah}
        onChange={(e) => setFromSurah(e.target.value)}
      >
        <option value="" hidden>
          Dari Surah
        </option>
        {surahs?.map((surah) => (
          <option key={surah.id} value={surah.id}>
            {surah.name}
          </option>
        ))}
      </select>
    </div>

    <div className="col-md-3 col-12">
      <select
        className="form-select"
        value={fromAyat}
        onChange={(e) => setFromAyat(e.target.value)}
        disabled={!fromSurah}
      >
        <option value="" hidden>
          Dari Ayat
        </option>
        {getAyatOptions(fromSurah).map((ayat) => (
          <option key={ayat} value={ayat}>
            {ayat}
          </option>
        ))}
      </select>
    </div>
    <div className="col-md-3 col-12">
      <select
        className="form-select"
        value={toAyat}
        onChange={(e) => setToAyat(e.target.value)}
        disabled={!fromSurah}
      >
        <option value="" hidden>
          Sampai Ayat
        </option>
        {getAyatOptions(fromSurah).map((ayat) => (
          <option key={ayat} value={ayat}>
            {ayat}
          </option>
        ))}
      </select>
    </div>
    <div className="col-md-3 col-12">
      <button
        className="btn btn-primary"
        disabled={!fromSurah ? true : false}
        onClick={handleAddToTable}
      >
        Simpan
      </button>
    </div>
  </div>
);

export default SurahSelection;
