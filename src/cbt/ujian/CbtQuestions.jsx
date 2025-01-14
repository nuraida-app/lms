import React, { useState } from "react";

const CbtQuestions = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive((prevState) => !prevState);
  };
  return (
    <div className="row my-2">
      <div className="col-lg-7 col-12">
        <div className="p-2 rounded shadow bg-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate at
          sapiente esse ipsa, nulla pariatur, officia quam dolore, iste
          inventore magnam deserunt maiores eligendi? Similique velit quis sunt
          exercitationem cum.
        </div>
      </div>

      <div className="col-lg-5 col-12">
        <div className="p-2 rounded shadow bg-white">
          <div className="d-flex flex-column gap-3 pointer">
            <div
              className="d-flex gap-2 py-2 px-1 rounded shadow"
              onClick={handleToggle}
              style={{ cursor: "pointer" }}
            >
              <input
                type="radio"
                className="form-check-input m-0"
                checked={isActive}
                readOnly
              />

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
                quaerat quae quasi laborum saepe maiores a voluptatum,
                distinctio veniam omnis eligendi alias fugit autem, accusamus
                perspiciatis consectetur placeat mollitia at.
              </p>
            </div>

            <button className={`btn btn-outline-warning text-start`}>
              Ragu Ragu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CbtQuestions;
