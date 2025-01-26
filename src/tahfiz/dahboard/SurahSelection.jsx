import React from "react";

const SurahSelection = ({
  surahs,
  fromSurah,
  setFromSurah,
  fromAyat,
  setFromAyat,
  toSurah,
  setToSurah,
  toAyat,
  setToAyat,
  getAyatOptions,
  handleAddToTable,
}) => (
  <div className="row g-2">
    <div className="col-md-5 col-12">
      <div className="d-flex gap-2">
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
    </div>

    <div className="col-md-5 col-12">
      <div className="d-flex  gap-2">
        <select
          className="form-select"
          value={toSurah}
          onChange={(e) => setToSurah(e.target.value)}
        >
          <option value="" hidden>
            Sampai Surah
          </option>
          {surahs?.map((surah) => (
            <option key={surah.id} value={surah.id}>
              {surah.name}
            </option>
          ))}
        </select>

        <select
          className="form-select"
          value={toAyat}
          onChange={(e) => setToAyat(e.target.value)}
          disabled={!toSurah}
        >
          <option value="" hidden>
            Sampai Ayat
          </option>
          {getAyatOptions(toSurah).map((ayat) => (
            <option key={ayat} value={ayat}>
              {ayat}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="col-md-2 col-12 text-center">
      <button className="btn btn-primary" onClick={handleAddToTable}>
        Simpan
      </button>
    </div>
  </div>
);

export default SurahSelection;
