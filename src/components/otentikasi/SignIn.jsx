import { Fragment, useState } from "react";
import "./signInUp.css";

const SignIn = () => {
  const [role, setRole] = useState("");

  return (
    <Fragment>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <div
        className="d-flex align-items-center justify-content-center flex-column gap-2"
        style={{ height: "100vh" }}
      >
        <img src="/nibs.png" alt="logo" style={{ height: 100, width: 100 }} />

        <button
          className="btn btn-info btn-sign-in"
          onClick={() => setRole("admin")}
        >
          Admin
        </button>
        <button
          className="btn btn-info btn-sign-in"
          onClick={() => setRole("teacher")}
        >
          Guru
        </button>
        <button
          className="btn btn-info btn-sign-in"
          onClick={() => setRole("student")}
        >
          Siswa
        </button>
        <button
          className="btn btn-info btn-sign-in"
          onClick={() => setRole("parent")}
        >
          Wali Murid
        </button>
      </div>
    </Fragment>
  );
};

export default SignIn;
