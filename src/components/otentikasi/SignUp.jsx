import { useEffect, useState } from "react";
import {
  useLoadMutation,
  useRegisterMutation,
} from "../../control/api/authApi";
import { setLogin } from "../../control/slice/authSlice";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

const convertPhoneNumber = (phone) =>
  phone?.startsWith("0") ? `62${phone.slice(1)}` : phone;

const SignUp = ({ setRole }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();
  const [load] = useLoadMutation();

  const [formData, setFormData] = useState({
    nis: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? convertPhoneNumber(value) : value,
    }));
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      await register(formData).unwrap();
      const userData = await load().unwrap();
      dispatch(setLogin(userData));
    } catch (err) {
      toast.error(err.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    if (user?.role === "parent") {
      window.location.href = "/wali-dashboard";
    }
  }, [user]);

  return (
    <form
      onSubmit={registerHandler}
      style={{ width: 300 }}
      className="d-flex flex-column gap-2"
    >
      {[
        { type: "number", name: "nis", placeholder: "NIS Siswa" },
        { type: "text", name: "name", placeholder: "Nama Wali Siswa" },
        { type: "email", name: "email", placeholder: "Email Aktif" },
        { type: "text", name: "phone", placeholder: "No Whatsapp" },
        {
          type: showPassword ? "text" : "password",
          name: "password",
          placeholder: "Password",
        },
      ].map(({ type, name, placeholder }) => (
        <input
          key={name}
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
          required
          value={formData[name]}
          onChange={handleChange}
        />
      ))}

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
        />
        <label className="form-check-label text-white" htmlFor="showPassword">
          Tampilkan Password
        </label>
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-danger" onClick={setRole}>
          <i className="bi bi-arrow-left"></i> Kembali
        </button>
        <button type="submit" className="btn btn-success" disabled={isLoading}>
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Loading...</span>
            </>
          ) : (
            "Daftar"
          )}
        </button>
      </div>
    </form>
  );
};

export default SignUp;
