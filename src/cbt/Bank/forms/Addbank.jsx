import React, { useState } from "react";

const Addbank = () => {
  const role = "admin";

  const [teacherId, setTeacherId] = useState(0);
  const [gradeId, setGradeId] = useState(0);
  const [shuffle, setShuffle] = useState(0);

  return (
    <div className="rounded shadow d-flex flex-column gap-2 mt-2 p-2">
      <p className="h5 m-0">Buat Bank Soal Baru</p>

      <form action="" className="d-flex flex-column gap-2">
        {role === "admin" && (
          <select
            name="teacherId"
            id=""
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="form-control"
          >
            <option value={0}>--Pilih guru--</option>
            <option value={1}>Guru 1</option>
            <option value={2}>Guru 2</option>
            <option value={3}>Guru 3</option>
          </select>
        )}

        <select
          name="gradeId"
          id=""
          value={gradeId}
          onChange={(e) => setGradeId(e.target.value)}
          className="form-control"
        >
          <option value={0}>--Pilih Tingkat--</option>
          <option value={1}>7</option>
          <option value={2}>8</option>
          <option value={3}>9</option>
        </select>

        <select
          name="shuffle"
          id=""
          value={shuffle}
          onChange={(e) => setShuffle(e.target.value)}
          className="form-control"
        >
          <option value={0}>--Acak--</option>
          <option value={true}>Ya</option>
          <option value={false}>Tidak</option>
        </select>

        <input
          type="text"
          name=""
          id=""
          className="form-control"
          placeholder="Nama Bank Soal"
        />

        <div className="input-group">
          <span className="input-group-text">Bobot PG</span>
          <input type="number" className="form-control" placeholder="60" />
        </div>

        <div className="input-group">
          <span className="input-group-text">Bobot Essay</span>
          <input type="number" className="form-control" placeholder="40" />
        </div>

        <button type="submit" className="btn btn-success">
          + Tambahkan
        </button>
      </form>
    </div>
  );
};

export default Addbank;
