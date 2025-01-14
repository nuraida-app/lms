import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Protected = ({ roles }) => {
  const navigate = useNavigate();
  const { user, signIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Periksa apakah user ada, perannya sesuai, dan sudah sign-in
      if (!user || !roles.includes(user?.role) || !signIn) {
        navigate("/"); // Redirect ke halaman beranda jika tidak memenuhi syarat
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [user, signIn, roles, navigate]);

  return null; // Tidak menampilkan apapun, hanya mengelola logika proteksi
};

export default Protected;
