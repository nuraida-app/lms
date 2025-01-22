import React, { useEffect, useState } from "react";
import { useGetHomebasesQuery } from "../../control/api/homebaseApi";
import { useAddAdminMutation } from "../../control/api/adminApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";

const FormComponent = ({ admin, remove }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [homebase_id, setHome] = useState("");

  const { data } = useGetHomebasesQuery();
  const [addAdmin, { data: msg, isSuccess, isLoading, error, reset }] =
    useAddAdminMutation();

  const addHandler = (e) => {
    e.preventDefault();

    const formData = {
      id,
      name,
      email,
      password,
      role,
      homebase_id: homebase_id ? homebase_id : null,
    };

    addAdmin(formData);
  };

  const cancel = () => {
    setId("");
    setName("");
    setEmail("");
    setRole("");
    setHome("");
    setPassword("");
    remove();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      setId("");
      setName("");
      setEmail("");
      setRole("default");
      setHome("default");
      setPassword("");

      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [msg, isSuccess, error]);

  useEffect(() => {
    if (admin) {
      setId(admin.id);
      setName(admin.name);
      setEmail(admin.email);
      setRole(admin.role);
      setHome(admin.homebase_id);
    }
  }, [admin]);

  return (
    <div className="mt-2 p-2 shadow rounded d-flex flex-column gap-2 bg-white border border-2">
      <p className="h5">Tambahkan Administrator</p>

      <form
        action=""
        className="d-flex flex-column gap-2"
        onSubmit={addHandler}
      >
        <input
          type="text"
          name="name"
          id=""
          placeholder="Nama Admin"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          name="email"
          id=""
          placeholder="Email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <select
          name="role"
          id=""
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-select"
          required
        >
          <option value="default" hidden>
            Pilih Level
          </option>
          <option value="super-admin">Center</option>
          <option value="admin">Admin Satuan</option>
          <option value="tahfiz">Tahfiz</option>
        </select>

        {role === "admin" && (
          <select
            name="role"
            id=""
            value={homebase_id}
            onChange={(e) => setHome(e.target.value)}
            className="form-select"
            required
          >
            <option value="default" hidden>
              Pilih Satuan
            </option>
            {data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}

        <input
          type="password"
          name="password"
          id=""
          placeholder="Masukan Password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-danger" onClick={cancel}>
            Batal
          </button>

          {isLoading ? (
            <BtnLoader />
          ) : (
            <button type="submit" className="btn btn-success">
              + Tambahkan
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
