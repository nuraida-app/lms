import { Fragment, useState, useEffect } from "react";
import "./signInUp.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLogin } from "../../control/slice/authSlice";
import { useLoadMutation, useLoginMutation } from "../../control/api/authApi";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, signIn } = useSelector((state) => state.auth);
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const [load] = useLoadMutation();

  const [role, setRole] = useState("none");
  const [accountValue, setAccountValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRoleChange = (value) => {
    setRole(value);
    setAccountValue(""); // Reset account value when role changes
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = {
      password,
      ...(role === "student"
        ? { nis: accountValue }
        : role === "teacher"
        ? { nip: accountValue }
        : { email: accountValue }),
    };

    login(credentials)
      .unwrap()
      .then(() => {
        load()
          .unwrap()
          .then((user) => {
            dispatch(setLogin(user));
          });
      })
      .catch((err) => {
        toast.error(err.data?.message || "Login failed");
      });
  };

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "admin":
          window.location.href = "/admin-dashboard";
          break;
        case "student":
          window.location.href = "/siswa-dashboard";
          break;
        case "teacher":
          window.location.href = "/guru-dashboard";
          break;
        case "super-admin":
          window.location.href = "/center-dashboard";
          break;
        default:
          break;
      }
    }
  }, [user]);

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

        {role === "none" && (
          <>
            <button
              className="btn btn-info btn-sign-in"
              onClick={() => handleRoleChange("admin")}
            >
              Admin
            </button>
            <button
              className="btn btn-info btn-sign-in"
              onClick={() => handleRoleChange("teacher")}
            >
              Guru
            </button>
            <button
              className="btn btn-info btn-sign-in"
              onClick={() => handleRoleChange("student")}
            >
              Siswa
            </button>
            <button
              className="btn btn-info btn-sign-in"
              onClick={() => handleRoleChange("parent")}
            >
              Wali Murid
            </button>
          </>
        )}

        {role !== "none" && (
          <form
            style={{ width: 300 }}
            className="d-flex flex-column gap-2"
            onSubmit={handleLogin}
          >
            <input
              type={role === "admin" || role === "parent" ? "email" : "number"}
              placeholder={
                role === "student"
                  ? "NIS"
                  : role === "teacher"
                  ? "NIP"
                  : "EMAIL"
              }
              value={accountValue}
              onChange={(e) => setAccountValue(e.target.value)}
              required
              className="form-control"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                checked={showPassword}
                onChange={handlePasswordToggle}
              />
              <label
                className="form-check-label text-white"
                htmlFor="flexCheckDefault"
              >
                Tampilkan Password
              </label>
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setRole("none")}
              >
                <i className="bi bi-arrow-left"></i> Kembali
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status">Loading...</span>
                  </>
                ) : (
                  "Masuk"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Fragment>
  );
};

export default SignIn;
