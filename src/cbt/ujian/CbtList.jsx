import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CbtList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const goToLink = (name, bankId, start, end) => {
    navigate(`/cbt-halaman/${name}/${bankId}/${start}/${end}`);
  };
  return (
    <div
      className={`d-flex gap-2 flex-wrap align-items-start justify-content-center`}
      style={{ height: "100%" }}
    >
      <div className="card shadow" style={{ width: "19rem" }}>
        <h5 className="card-header">
          Card title asdas asdas asdasd asdasd sda
        </h5>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => goToLink("soal", 2 / 34 / 45)}
          >
            Ikuti Ujian
          </button>
        </div>
      </div>
    </div>
  );
};

export default CbtList;
