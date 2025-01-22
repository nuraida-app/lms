import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { menus } from "./Menus";
import Protected from "../../../components/otentikasi/Protected";
import MetaData from "../../../components/meta/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../../control/api/authApi";
import { setLogout } from "../../../control/slice/authSlice";

const Layout = ({ children, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();

  const goToLink = (link) => {
    navigate(link);
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
  return (
    <Fragment>
      <Protected roles={["super-admin"]} />
      <MetaData title={title} />
      <div className="container-fluid fixed-top bg-info">
        <nav
          className="navbar navbar-expand-lg"
          aria-label="Thirteenth navbar example"
        >
          <div className="container-fluid">
            <a
              className="navbar-brand col-lg-2 me-0 text-white"
              href="/center-dashboard"
            >
              {user?.name}
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
                {menus.map((menu, i) => (
                  <button
                    key={i}
                    className="btn btn-light"
                    onClick={() => goToLink(menu.link)}
                  >
                    {menu.label}
                  </button>
                ))}

                <button className="btn btn-danger" onClick={logutHandler}>
                  {isLoading ? `Loading...` : `Logout`}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div
        className="container-fluid overflow-auto"
        style={{ marginTop: "65px", height: "calc(100vh - 65px)" }}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default Layout;
