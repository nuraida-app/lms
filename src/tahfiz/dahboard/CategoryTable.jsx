import React from "react";

const CategoryTable = ({ categories }) => (
  <div className="table-responsive border border-2 p-1 rounded">
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
                item.indicators.filter((indi) => indi !== null).length > 0 ? (
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
  </div>
);

export default CategoryTable;
