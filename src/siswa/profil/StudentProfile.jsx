import React, { useState } from "react";
import { useSelector } from "react-redux";

const StudentProfile = () => {
  const { user } = useSelector((state) => state.auth);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  console.log(user);
  return (
    <div
      style={{ width: 400 }}
      className="d-flex flex-column gap-2 p-3 rounded shadow bg-white border border-2"
    >
      <div>
        <label htmlFor="fullName" className="form-label">
          Nama Lengkap
        </label>
        <input
          type="text"
          id="fullName"
          className="form-control"
          readOnly
          value={user?.name || ""}
        />
      </div>

      <div>
        <label htmlFor="nis" className="form-label">
          NIS
        </label>
        <input
          type="text"
          id="nis"
          className="form-control"
          readOnly
          value={user?.nis || ""}
        />
      </div>

      <div>
        <label htmlFor="homebase" className="form-label">
          Satuan
        </label>
        <input
          type="text"
          id="homebase"
          className="form-control"
          readOnly
          value={user?.homebase || ""}
        />
      </div>

      <div>
        <label htmlFor="grade" className="form-label">
          Tingkat
        </label>
        <input
          type="text"
          id="grade"
          className="form-control"
          readOnly
          value={user?.grade || ""}
        />
      </div>

      <div>
        <label htmlFor="class" className="form-label">
          Kelas
        </label>
        <input
          type="text"
          id="class"
          className="form-control"
          readOnly
          value={user?.class || ""}
        />
      </div>

      <div>
        <label htmlFor="oldPassword" className="form-label">
          Password Lama
        </label>
        <input
          type="password"
          id="oldPassword"
          className="form-control"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Masukan Password Lama"
        />
      </div>

      <div>
        <label htmlFor="newPassword" className="form-label">
          Password Baru
        </label>
        <input
          type="password"
          id="newPassword"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Masukan Password Baru"
        />
      </div>

      <div className="btn btn-success">Perbarui Data</div>
    </div>
  );
};

export default StudentProfile;
