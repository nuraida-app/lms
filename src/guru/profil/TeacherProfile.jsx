import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";

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
  const { user } = useSelector((state) => state.auth);

  // Initialize form state
  const [formData, setFormData] = useState({
    nip: user?.nip || "",
    name: user?.name || "",
    phone: "",
    email: user?.email || "",
    homebase: user?.homebase.map((hb) => hb.name).join(", ") || "",
    subject: user?.subjects.join(", ") || "",
    oldPassword: "",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
    // Add form submission logic here (e.g., API call)
  };

  console.log(user);

  return (
    <Layout title={user?.name}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-start gap-3 p-3 rounded shadow bg-white border border-2">
            <div className="form-group w-100">
              <label htmlFor="homebase">Satuan Pendidikan</label>
              <input
                type="text"
                className="form-control"
                id="homebase"
                placeholder="name@example.com"
                readOnly
                value={user?.homebase.map((item) => item.name).join(", ")}
              />
            </div>

            <div className="form-group w-100">
              <label htmlFor="subjects">Mata Pelajaran</label>
              <input
                type="text"
                className="form-control"
                id="subjects"
                placeholder="name@example.com"
                readOnly
                value={user.subjects.join(", ")}
              />
            </div>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
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
                    name={item.name}
                    value={formData[item.name]}
                    onChange={handleInputChange}
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
