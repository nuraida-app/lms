import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import Selects from "./Selects";
import TableData from "./TableData";
import Scoring from "./Scoring";
import { useAddscoreMutation } from "../../control/api/scoreApi";
import { toast } from "react-toastify";

const TahfizScoring = () => {
  const params = useParams();
  const { name, nis } = params;
  const formatted = name.replaceAll("-", " ");

  const [typeId, setTypeId] = useState("");
  const [examiner, setExaminer] = useState("");
  const [juz, setJuz] = useState({});
  const [surah, setSurah] = useState({});
  let countAyat = surah?.to_ayat;
  const [fromAyat, setFromAyat] = useState("");
  const [toAyat, setToAyat] = useState("");
  let countLine = surah?.to_line;
  const [fromLine, setFromLine] = useState("");
  const [toLine, setToLine] = useState("");
  const [tableData, setTableData] = useState([]);

  const [addScore, { data, isSuccess, isLoading, error, reset }] =
    useAddscoreMutation();

  const addToTable = () => {
    setTableData((prev) => [
      ...prev,
      {
        juzId: juz.id,
        fromSurah: surah.surah_id,
        fromSurahName: surah.surah,
        fromAyat,
        toAyat,
        fromLine,
        toLine,
      },
    ]);
    countAyat = 0;
    setFromAyat("");
    setToAyat("");
    countLine = 0;
    setFromLine("");
    setToLine("");
  };

  const deleteSurah = (name) => {
    const filteredTableData = tableData.filter(
      (surah) => surah.fromSurahName !== name
    );
    setTableData(filteredTableData);
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
      nis: parseInt(nis),
      juzId: juz.id,
      surahs: tableData,
      examiner: parseInt(examiner),
      poin: {
        type_id: parseInt(typeId),
        categories,
      },
    };

    if (!typeId || !examiner || !tableData || !categories) {
      return toast.warning(`Lengkapi data`);
    }

    addScore(data);

    // **Mengosongkan input setelah submit**
    categoryInputs.forEach((input) => (input.value = ""));
    indicatorInputs.forEach((input) => (input.value = ""));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setTypeId("");
      setExaminer("");
      setFromAyat("");
      setToAyat("");
      setFromLine("");
      setToLine("");
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
    <Layout title={`hafalan Siswa ${formatted}`}>
      <div
        style={{ overflow: "auto" }}
        className='h-100 p-2 d-flex flex-column gap-2 rounded bg-white border shadow'
      >
        <p className='m-0 h5'>{formatted}</p>

        <Selects
          typeId={typeId}
          setTypeId={setTypeId}
          examiner={examiner}
          setExaminer={setExaminer}
          surah={surah}
          setSelectedSurah={setSurah}
          setSelectedJuz={setJuz}
          countAyat={countAyat}
          fromAyat={fromAyat}
          setFromAyat={setFromAyat}
          toAyat={toAyat}
          setToAyat={setToAyat}
          countLine={countLine}
          fromLine={fromLine}
          setFromLine={setFromLine}
          toLine={toLine}
          setToLine={setToLine}
          addToTable={addToTable}
          setTableData={setTableData}
        />

        <div className='row g-2'>
          <div className='col-lg-6 col-12'>
            <Scoring />
          </div>
          <div className='col-lg-6 col-12'>
            <TableData data={tableData} deleteSurah={deleteSurah} />

            <div className='text-end'>
              {tableData?.length > 0 && (
                <button
                  className='btn btn-success'
                  disabled={isLoading}
                  onClick={handleSave}
                >
                  Simpan Data
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TahfizScoring;
