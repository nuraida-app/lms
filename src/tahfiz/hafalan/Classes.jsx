import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useGetClassessQuery,
  useGetGradesQuery,
  scoreApi,
} from "../../control/api/scoreApi";

const Classes = ({ setCode }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const { data: grades, isFetching: isFetchingGrades } = useGetGradesQuery();
  const { data: classes, isFetching: isFetchingClasses } = useGetClassessQuery(
    id,
    { skip: !id }
  );

  // Fungsi untuk reset kelas dan cache students
  const handleReset = () => {
    dispatch(scoreApi.util.resetApiState()); // Reset seluruh cache API
    setId(""); // Reset ID grade
    setCode(""); // Reset kode kelas
    window.location.reload();
  };

  return (
    <div className="p-2 bg-white rounded border shadow d-flex align-items-center gap-2">
      {/* Jika `id` kosong, tampilkan daftar Grades */}
      {!id &&
        grades?.map((item) => (
          <button
            key={item.id}
            className="btn btn-secondary"
            onClick={() => setId(item.id)}
            disabled={isFetchingGrades} // Disable jika loading
          >
            {isFetchingGrades ? "Loading..." : item.grade}
          </button>
        ))}

      {/* Jika ada `id`, tampilkan daftar Classes */}
      {id &&
        (isFetchingClasses ? (
          <span>Loading...</span>
        ) : (
          classes?.map((item) => (
            <button
              key={item.id}
              className="btn btn-secondary"
              onClick={() => setCode(item.code)}
            >
              {item.name}
            </button>
          ))
        ))}

      {/* Tombol Reset hanya muncul jika `id` sudah dipilih */}
      {id && (
        <button className="btn btn-danger" onClick={handleReset}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Classes;
