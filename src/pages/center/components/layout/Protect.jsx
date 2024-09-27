import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protect = () => {
  const navigate = useNavigate();
  const { user, isLogout } = useSelector((state) => state.authentication);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user?.role !== "super-admin") {
        navigate("/");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [user, navigate]);

  useEffect(() => {
    if (isLogout) {
      navigate("/");
      localStorage.removeItem("login");
    }
  }, [isLogout]);
};

export default Protect;
