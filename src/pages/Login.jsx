import { Box, Button, IconButton, Input, InputAdornment } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser } from "../state-control/api/authApi";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, isAuthLoading, user, authError } = useSelector(
    (state) => state.authentication
  );

  const [role, setRole] = useState("none");

  const [nis, setNis] = useState("");
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const account = (value) => {
    if (role === "student") {
      setNis(value);
    } else if (role === "teacher") {
      setNip(value);
    } else if (role === "staff") {
      setEmail(value);
    }
  };

  const backHandler = () => {
    setRole("none");
    setNis("");
    setNip("");
    setEmail("");
    setPassword("");
  };

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(
      authUser({
        ...(role === "student"
          ? { nis }
          : role === "teacher"
          ? { nip }
          : { email }),
        password,
      })
    );

    setNis("");
    setNip("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (user.role === "student") {
        window.location.href = "/student/dashboard";
      } else if (user.role === "teacher") {
        window.location.href = "/teacher/dashboard";
      } else if (user.role === "super-admin") {
        window.location.href = "/admin-center";
      }
    }

    if (isAuth) {
      localStorage.setItem("login", JSON.stringify("login"));
    } else if (isAuth === false && authError) {
      toast.error(authError);

      localStorage.removeItem("login");
    }
  }, [user, isAuth, authError]);

  return (
    <div className="login_page">
      <img src="/nibs.png" alt="logo" className="logo" />

      {role === "none" && (
        <Box
          sx={{
            width: 350,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "10px",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#f48e21", "&:hover": { bgcolor: "#f48e21" } }}
            onClick={() => setRole("student")}
          >
            siswa
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#7462ff", "&:hover": { bgcolor: "#7462ff" } }}
            onClick={() => setRole("teacher")}
          >
            guru
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#d2001a", "&:hover": { bgcolor: "#d2001a" } }}
            onClick={() => setRole("staff")}
          >
            admin
          </Button>
        </Box>
      )}

      {role !== "none" && (
        <form className="login_form" onSubmit={loginHandler}>
          <Input
            type="text"
            placeholder={
              role === "student" ? "NIS" : role === "teacher" ? "NIP" : "EMAIL"
            }
            value={role === "student" ? nis : role === "teacher" ? nip : email}
            onChange={(e) => account(e.target.value)}
            required
          />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            required
          />

          <Button variant="contained" color="success" type="submit">
            sign in
          </Button>

          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <IconButton onClick={backHandler}>
              <KeyboardBackspaceIcon />
            </IconButton>
          </Box>
        </form>
      )}
    </div>
  );
};

export default Login;
