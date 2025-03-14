import React from "react";
import { useGetCategoriesQuery } from "../../control/api/metricApi";

const Scoring = () => {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover">
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
                  item.indicators.filter((indi) => indi !== null).length > 0 ? (
                    item.indicators
                      .filter((indi) => indi !== null)
                      .map((indi, j) => (
                        <div
                          key={j}
                          className="d-flex align-items-center justify-content-between p-2 gap-2 rounded border bg-white"
                        >
                          <p className="m-0">{indi.name}</p>
                          <input
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
                    data-category-id={item.id}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoring;
