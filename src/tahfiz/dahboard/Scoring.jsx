import React, { useEffect, useState } from "react";
import { useAddscoreMutation } from "../../control/api/scoreApi";
import {
  useGetCategoriesQuery,
  useGetTypesQuery,
} from "../../control/api/metricApi";
import { toast } from "react-toastify";
import { useGetQuranQuery } from "../../control/api/quranApi";

const columns = [
  { label: "No" },
  { label: "NIS" },
  { label: "Nama Lengkap" },
  { label: "Tingkat" },
  { label: "Kelas" },
  { label: "Aksi" },
];

const Scoring = ({ student }) => {
  const [search, setSearch] = useState("");
  const [typeId, setTypeId] = useState("");

  const { data: types } = useGetTypesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [addScore, { data, isSuccess, isLoading, error, reset }] =
    useAddscoreMutation();

  const { data: surahs } = useGetQuranQuery({ search });

  console.log(surahs);

  const handleSave = () => {
    if (!typeId) {
      return toast.warning(`Lengkapi data`);
    }

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
      poin: {
        type_id: parseInt(typeId),
        categories,
      },
    };

    console.log(data);
    addScore(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      window.location.reload();
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
      <div className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
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

            {typeId && (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Kategori</th>
                    <th>Indikator</th>
                    <th>Poin</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((item, i) => (
                    <tr key={i}>
                      <td className="align-middle">{item.category}</td>
                      <td className="align-middle">
                        <div className="d-flex flex-column gap-2">
                          {Array.isArray(item.indicators) &&
                          item.indicators.filter((indi) => indi !== null)
                            .length > 0 ? (
                            item.indicators
                              .filter((indi) => indi !== null)
                              .map((indi, j) => (
                                <div
                                  key={j}
                                  className="d-flex align-items-center justify-content-between p-2 rounded border border-2 bg-white"
                                >
                                  <p className="m-0">{indi.name}</p>
                                  <input
                                    style={{ width: 200 }}
                                    type="text"
                                    className="form-control"
                                    placeholder="Penilaian"
                                    data-indicator-id={indi.id}
                                    data-category-id={item.id}
                                  />
                                </div>
                              ))
                          ) : (
                            <p className="m-0 text-muted">
                              Tidak ada indikator untuk kategori ini
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex justify-content-center">
                          <input
                            type="text"
                            name="category-score"
                            className="form-control"
                            placeholder="Nilai"
                            style={{ width: 80 }}
                            data-category-id={item.id}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setStudent({})}
            >
              Batal
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoring;
