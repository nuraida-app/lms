import React, { useEffect, useState } from "react";
import { useAddscoreMutation } from "../../control/api/scoreApi";
import {
  useGetCategoriesQuery,
  useGetTypesQuery,
} from "../../control/api/metricApi";
import { toast } from "react-toastify";
import { useGetQuranQuery } from "../../control/api/quranApi";
import SurahSelection from "./SurahSelection";
import TableData from "./TableData";
import CategoryTable from "./CategoryTable";
import { useGetExaminersQuery } from "../../control/api/examinerApi";

const Scoring = ({ student }) => {
  const [search, setSearch] = useState("");
  const [typeId, setTypeId] = useState("");
  const [examiner, setExaminer] = useState("");

  const [fromSurah, setFromSurah] = useState("");
  const [fromAyat, setFromAyat] = useState("");
  const [toAyat, setToAyat] = useState("");
  const [tableData, setTableData] = useState([]);

  const { data: types } = useGetTypesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [addScore, { data, isSuccess, isLoading, error, reset }] =
    useAddscoreMutation();
  const { data: surahs } = useGetQuranQuery({ search });
  const { data: examiners } = useGetExaminersQuery({ search });

  const handleAddToTable = () => {
    if (fromSurah && fromAyat && toAyat) {
      const fromSurahName =
        surahs.find((surah) => surah.id === parseInt(fromSurah))?.name || "";

      setTableData((prev) => [
        ...prev,
        { fromSurah, fromSurahName, fromAyat, toAyat },
      ]);

      setFromSurah("");
      setFromAyat("");
      setToAyat("");
    }
  };

  const getAyatOptions = (surahId) => {
    const selectedSurah = surahs?.find(
      (surah) => surah.id === parseInt(surahId)
    );
    return selectedSurah
      ? Array.from({ length: selectedSurah.ayat }, (_, i) => i + 1)
      : [];
  };

  const handleSave = () => {
    const categoryInputs = document.querySelectorAll("[name='category-score']");
    const indicatorInputs = document.querySelectorAll(
      "input[data-indicator-id]"
    );

    const categories = Array.from(categoryInputs).map((categoryInput) => {
      const categoryId = categoryInput.dataset.categoryId;
      const categoryPoin = categoryInput.value;

      const indicators = Array.from(indicatorInputs)
        .filter(
          (indicatorInput) => indicatorInput.dataset.categoryId === categoryId
        )
        .map((indicatorInput) => ({
          indicator_id: parseInt(indicatorInput.dataset.indicatorId),
          poin: indicatorInput.value,
        }));

      return {
        category_id: parseInt(categoryId),
        poin: categoryPoin,
        indicators,
      };
    });

    const data = {
      nis: student.nis,
      surahs: tableData,
      examiner,
      poin: {
        type_id: parseInt(typeId),
        categories,
      },
    };

    if (!typeId || !examiner || !tableData || !categories) {
      return toast.warning(`Lengkapi data`);
    }

    addScore(data);
  };

  const handleCancel = () => {
    setTypeId("");
    setExaminer("");
    setFromSurah("");
    setFromAyat("");
    setToAyat("");
    setTableData([]);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setTypeId("");
      setExaminer("");
      setFromSurah("");
      setFromAyat("");
      setToAyat("");
      setTableData([]);
      reset();
    }

    if (error) {
      console.log(error);
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  return (
    <div
      className="modal fade"
      id="nilai"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {student?.name}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column gap-2">
            <div className="d-flex justify-content-between gap-2">
              <select
                name="type"
                id="1"
                className="form-select"
                value={typeId || ""}
                onChange={(e) => setTypeId(e.target.value)}
              >
                <option value="" hidden>
                  Pilih Jenis Penilaian
                </option>

                {types?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                name="type"
                id="1"
                className="form-select"
                value={examiner || ""}
                onChange={(e) => setExaminer(e.target.value)}
              >
                <option value="" hidden>
                  Pilih Penguji
                </option>

                {examiners?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <SurahSelection
              surahs={surahs}
              fromSurah={fromSurah}
              setFromSurah={setFromSurah}
              fromAyat={fromAyat}
              setFromAyat={setFromAyat}
              toAyat={toAyat}
              setToAyat={setToAyat}
              getAyatOptions={getAyatOptions}
              handleAddToTable={handleAddToTable}
            />

            <TableData tableData={tableData} />

            {tableData?.length > 0 && <CategoryTable categories={categories} />}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleCancel}
            >
              Batal
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isLoading ? true : false}
            >
              {isLoading ? `Loading...` : `Simpan`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoring;
