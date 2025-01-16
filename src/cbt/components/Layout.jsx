import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminMenus } from "../../admin/components/layout/Menus";
import { TeacherMenus } from "../../guru/components/layout/Menus";
import MetaData from "../../components/meta/MetaData";
import Protected from "../../components/otentikasi/Protected";

const Layout = ({ children, title }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const role = user?.role;
  const name = user?.name;

  const goToLink = (link) => {
    navigate(link);
  };
  return (
    <Fragment>
      <Protected roles={["admin", "teacher"]} />
      <MetaData title={title} />
      <div className="container-fluid fixed-top bg-info">
        <nav
          className="navbar navbar-expand-lg"
          aria-label="Thirteenth navbar example"
        >
          <div className="container-fluid">
            <a
              className="navbar-brand col-lg-2 me-0 text-white"
              href={role === "admin" ? "/admin-dashboard" : "/guru-dashboard"}
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
                {(role === "admin" ? AdminMenus : TeacherMenus).map(
                  (menu, i) => (
                    <button
                      key={i}
                      className="btn btn-light"
                      onClick={() => goToLink(menu.link)}
                    >
                      {menu.label}
                    </button>
                  )
                )}

                <button className="btn btn-danger">Logout</button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div
        className="container-fluid bg-white"
        style={{
          marginTop: "65px",
          height: "calc(100vh - 65px)",
        }}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default Layout;
