import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ParentProfile = () => {
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);
  return (
    <div
      style={{ width: 400 }}
      className="d-flex flex-column gap-2 p-3 rounded shadow bg-white border border-2"
    >
      <input
        type="text"
        className="form-control"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        className="form-control"
        value={email || ""}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        className="form-control"
        value={phone || ""}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
  );
};

export default ParentProfile;
