import React from "react";
import Layout from "../components/layout/Layout";

const forms = [
  { label: "NIP", type: "number", name: "nip", placeholder: "NIP" },
  {
    label: "Nama Lengkap",
    type: "text",
    name: "name",
    placeholder: "Nama Lengkap",
  },
  {
    label: "Whatsapp",
    type: "number",
    name: "phone",
    placeholder: "No Whatsapp Aktif",
  },
  { label: "Email", type: "email", name: "email", placeholder: "Email Aktif" },
  {
    label: "Satuan Pendidikan",
    type: "text",
    name: "homebase",
    placeholder: "Tempat Mengajar",
  },
  {
    label: "Mata Pelajaran",
    type: "text",
    name: "subject",
    placeholder: "Bidang Studi",
  },
  {
    label: "Password Lama",
    type: "password",
    name: "oldPassword",
    placeholder: "Masukan Password Lama",
  },
  {
    label: "Password Baru",
    type: "password",
    name: "newPassword",
    placeholder: "Masukan Password Baru",
  },
];

const TeacherProfile = () => {
  return (
    <Layout>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-center gap-2 p-3 rounded shadow">
            <img
              src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg"
              alt="foto_profile"
              width={150}
              height={150}
              className="rounded-circle"
              style={{ objectFit: "cover" }}
            />

            <form action="" className="d-flex flex-column gap-3">
              {forms.map((item, i) => (
                <div key={i} className="input-group">
                  <span
                    style={{ width: 150 }}
                    className="input-group-text"
                    id="basic-addon1"
                  >
                    {item.label}
                  </span>
                  <input
                    type={item.type}
                    className="form-control"
                    placeholder={item.placeholder}
                    aria-label={item.label}
                  />
                </div>
              ))}

              <button type="submit" className="btn btn-success">
                Perbarui Profil
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherProfile;
