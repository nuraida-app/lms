import React, { useState } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import ParentProfile from "./ParentProfile";

const ParentDash = () => {
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(true);

  const close = () => setOpen(false);

  return (
    <Layout title={user?.name}>
      <div
        className="container-fluid d-flex align-items-start justify-content-center"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <ParentProfile />
      </div>

      {open && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="modal d-block"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Pemberitahuan</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={close}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="text-center">
                    Terimakasih telah menggunakan portal resmi PPDB Nuraida
                  </p>
                  <p className="text-center">
                    Sistem Informasi ini masih dalam tahap pengembangan, jika
                    ada saran silahkan kirimkan ke email di bawah ini
                  </p>
                  <p className="text-center">
                    Sehubungan dengan adanya sentralisasi dan sinkronisasi
                    dengan data Dapodik, diharapkan untuk memperbarui data siswa
                  </p>
                  <div className="modal-footer mt-2">
                    <button className="btn btn-success">
                      nuraida.appdev@gmail.com
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default ParentDash;
