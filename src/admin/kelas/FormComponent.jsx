import React, { useState } from "react";

const FormComponent = () => {
  const [grade, setGrade] = useState("default");

  return (
    <div className="d-flex flex-column gap-2 rounded p-2 shadow mt-2">
      <p className="m-0 h5">Tambahkan Data Kelas</p>

      <form action="" className="d-flex flex-column gap-2">
        <select
          name="grade"
          id=""
          className="form-control"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="default">--Pilih Tingkat--</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        <input
          type="text"
          name="name"
          id=""
          placeholder="Kelas"
          className="form-control"
        />

        <button type="submit" className="btn btn-success">
          + Tambahkan
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
