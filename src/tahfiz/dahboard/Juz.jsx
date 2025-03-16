import React from "react";
import { useGetJuzQuery } from "../../control/api/quranApi";

const Juz = () => {
  const page = "";
  const limit = "";
  const search = "";

  const { data } = useGetJuzQuery({ page, limit, search });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {data?.map((item) => (
                <li key={item.id} className="page-item">
                  <a className="page-link" href="#">
                    {item.id}
                  </a>
                </li>
              ))}

              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Juz;
