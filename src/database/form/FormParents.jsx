import React, { useState, useEffect } from "react";
import { useAddParentsDataMutation } from "../../control/api/dbApi";
import { toast } from "react-toastify";

const convertPhoneNumber = (phone) => {
  if (phone?.startsWith("0")) {
    return `62${phone.slice(1)}`;
  }
  return phone;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid dates
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const FormParents = ({ student }) => {
  const [addParentsData, { data, isSuccess, isLoading, error, reset }] =
    useAddParentsDataMutation();

  const [formData, setFormData] = useState({
    father_nik: "",
    father_name: "",
    father_birth_place: "",
    father_birth_date: "",
    father_job: "",
    father_phone: "",
    mother_nik: "",
    mother_name: "",
    mother_birth_place: "",
    mother_birth_date: "",
    mother_job: "",
    mother_phone: "",
    nis: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "father_phone" || name === "mother_phone"
          ? convertPhoneNumber(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addParentsData(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, error, data]);

  useEffect(() => {
    if (student) {
      setFormData({
        father_nik: student.father_nik,
        father_name: student.father_name,
        father_birth_place: student.father_birth_place,
        father_birth_date: formatDate(student.father_birth_date),
        father_job: student.father_job,
        father_phone: convertPhoneNumber(student.father_phone),
        mother_nik: student.mother_nik,
        mother_name: student.mother_name,
        mother_birth_place: student.mother_birth_place,
        mother_birth_date: formatDate(student.mother_birth_date),
        mother_job: student.mother_job,
        mother_phone: convertPhoneNumber(student.mother_phone),
        nis: student.nis,
      });
    }
  }, [student]);

  return (
    <form
      className="p-2 rounded border shadow bg-white mt-2 row g-2"
      onSubmit={handleSubmit}
    >
      <div className="col-md-6 col-12 d-flex flex-column gap-2">
        <input
          type="text"
          name="father_nik"
          id="1"
          className="form-control"
          placeholder="NIK Ayah"
          value={formData.father_nik || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="father_name"
          id="2"
          className="form-control"
          placeholder="Nama Ayah"
          value={formData.father_name || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="father_birth_place"
          id="3"
          className="form-control"
          placeholder="Tempat Lahir Ayah"
          value={formData.father_birth_place || ""}
          onChange={handleChange}
        />
        <input
          type="date"
          name="father_birth_date"
          id="4"
          className="form-control"
          placeholder="Tanggal Lahir Ayah"
          value={formData.father_birth_date || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="father_job"
          id="5"
          className="form-control"
          placeholder="Pekerjaan Ayah"
          value={formData.father_job || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          name="father_phone"
          id="6"
          className="form-control"
          placeholder="Tlp Ayah"
          value={formData.father_phone || ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6 col-12 d-flex flex-column gap-2">
        <input
          type="text"
          name="mother_nik"
          id="1"
          className="form-control"
          placeholder="NIK Ayah"
          value={formData.mother_nik || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mother_name"
          id="2"
          className="form-control"
          placeholder="Nama Ayah"
          value={formData.mother_name || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mother_birth_place"
          id="3"
          className="form-control"
          placeholder="Tempat Lahir Ayah"
          value={formData.mother_birth_place || ""}
          onChange={handleChange}
        />
        <input
          type="date"
          name="mother_birth_date"
          id="4"
          className="form-control"
          placeholder="Tanggal Lahir Ayah"
          value={formData.mother_birth_date || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mother_job"
          id="5"
          className="form-control"
          placeholder="Pekerjaan Ayah"
          value={formData.mother_job || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          name="mother_phone"
          id="6"
          className="form-control"
          placeholder="Tlp Ayah"
          value={formData.mother_phone || ""}
          onChange={handleChange}
        />
      </div>
      <div className="text-end">
        <button type="submit" className="btn btn-success">
          Simpan
        </button>
      </div>
    </form>
  );
};

export default FormParents;
