import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { AdminMenus } from "../../../admin/components/layout/Menus";
import { TeacherMenus } from "../../../guru/components/layout/Menus";
import { StudentMenus } from "../../../siswa/components/menu/Menus";
import MetaData from "../../../components/meta/MetaData";
import Protected from "../../../components/otentikasi/Protected";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../../control/api/authApi";
import { setLogout } from "../../../control/slice/authSlice";
import BtnLoader from "../../../components/loader/BtnLoader";

const Layout = ({ children, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [logout, { isLoading, error }] = useLogoutMutation();

  const role = user?.role;
  const name = user?.name;

  const goToLink = (menu) => {
    if (menu.label === "Tahfiz") {
      const formatted = user.name.replace(/\s+/g, "-");
      const link = menu.link + `/${user.nis}/${formatted}`;

      navigate(link);
    } else if (menu.label === "Biodata") {
      const formatted = user.name.replace(/\s+/g, "-");
      const link = menu.link + `/${formatted}/${user.nis}`;

      navigate(link);
    } else {
      navigate(menu.link);
    }
  };

  const logutHandler = async () => {
    try {
      await logout().unwrap();

      dispatch(setLogout());

      navigate("/");
    } catch (error) {
      console.log(error.data.message);
    }
  };

  const getHomePageLink = () => {
    switch (role) {
      case "admin":
        return "/admin-dashboard";
      case "teacher":
        return "/guru-dashboard";
      case "student":
        return "/siswa-dashboard";
      default:
        return "/";
    }
  };
  return (
    <Fragment>
      <MetaData title={title} />
      <Protected roles={["teacher", "admin", "student"]} />
      <div className="container-fluid fixed-top bg-info">
        <nav
          className="navbar navbar-expand-lg"
          aria-label="Thirteenth navbar example"
        >
          <div className="container-fluid">
            <a
              className="navbar-brand col-lg-2 me-0 text-white"
              href={getHomePageLink()}
            >
              {role === "admin" ? "Admin Satuan" : name}
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample11"
              aria-controls="navbarsExample11"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse d-lg-flex"
              id="navbarsExample11"
            >
              <div className="navbar-nav col-12 justify-content-lg-end d-flex gap-2">
                {(role === "admin"
                  ? AdminMenus
                  : role === "teacher"
                  ? TeacherMenus
                  : StudentMenus
                ).map((menu, i) => (
                  <button
                    key={i}
                    className="btn btn-light"
                    onClick={() => goToLink(menu)}
                  >
                    {menu.label}
                  </button>
                ))}

                {isLoading ? (
                  <BtnLoader />
                ) : (
                  <button className="btn btn-danger" onClick={logutHandler}>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div
        className="container-fluid bg-light"
        style={{
          marginTop: "65px",
          minHeight: "calc(100vh - 65px)",
        }}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default Layout;
