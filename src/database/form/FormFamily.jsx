import React, { useState, useEffect } from "react";
import {
  useAddFamilyDataMutation,
  useDeleteFamilyDataMutation,
} from "../../control/api/dbApi";
import { toast } from "react-toastify";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid dates
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function calculateAge(birthDate) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }
  return age;
}

const FormFamily = ({ student }) => {
  const [addFamilyData, { isSuccess, data, isLoading, error, reset }] =
    useAddFamilyDataMutation();
  const [
    deleteFamilyData,
    {
      isSuccess: deleteSuccess,
      data: message,
      isLoading: deleteLoading,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteFamilyDataMutation();

  const [familyData, setFamilyData] = useState(student?.family_info || []);

  const [formData, setFormData] = useState({
    family_name: "",
    family_gender: "",
    family_birth_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const newFamilyMember = {
      family_name: formData.family_name,
      family_gender: formData.family_gender,
      family_birth_date: formData.family_birth_date,
      id: Date.now(),
    };

    const payload = {
      nis: student.nis,
      familyData: [...familyData, newFamilyMember],
    };

    addFamilyData(payload)
      .unwrap()
      .then(() => {
        setFamilyData((prevFamilyData) => [...prevFamilyData, newFamilyMember]);

        setFormData({
          family_name: "",
          family_gender: "",
          family_birth_date: "",
        });
      });
  };

  const handleDelete = (id) => {
    const payload = {
      nis: student.nis,
      familyId: id,
    };

    deleteFamilyData(payload)
      .unwrap()
      .then(() => {
        setFamilyData(familyData.filter((item) => item.id !== id));
      });
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
  }, [isSuccess, error, reset, data]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(message.message);
      deleteReset();
    }

    if (deleteError) {
      toast.error(deleteError.data.message);
      deleteReset();
    }
  }, [deleteSuccess, deleteError, message]);

  return (
    <div className="row">
      <div className="col-md-3 col-12">
        <form
          action=""
          className="d-flex flex-column gap-2 rounded border shadow p-2 bg-white"
          onSubmit={handleAdd}
        >
          <input
            type="text"
            name="family_name"
            id="1"
            className="form-control"
            placeholder="Nama Keluarga"
            required
            value={formData.family_name || ""}
            onChange={handleChange}
          />

          <select
            name="family_gender"
            id="2"
            className="form-select"
            value={formData.family_gender || ""}
            onChange={handleChange}
          >
            <option value="Male">Laki Laki</option>
            <option value="Female">Perempuan</option>
          </select>

          <input
            type="date"
            name="family_birth_date"
            id="3"
            className="form-control"
            value={formData.family_birth_date || ""}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn btn-success"
            disabled={isLoading ? true : false}
          >
            {isLoading ? "Loading..." : "Simpan"}
          </button>
        </form>
      </div>
      <div className="col-md-9 col-12">
        <div className="table-responsive bg-white p-2 rounded border shadow">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {[
                  "No",
                  "Nama",
                  "Jenis Kelamin",
                  "Tanggal Lahir",
                  "usia",
                  "Aksi",
                ].map((item) => (
                  <th key={item} className="text-center">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {familyData?.map((item, index) => (
                <tr key={index}>
                  <td className="text-center align-middle">{index + 1}</td>
                  <td className="align-middle">{item.family_name}</td>
                  <td className="text-center align-middle">
                    {item.family_gender === "Female"
                      ? "Perempuan"
                      : "Laki Laki"}
                  </td>
                  <td className="text-center align-middle">
                    {formatDate(item.family_birth_date)}
                  </td>
                  <td className="text-center align-middle">
                    {`${calculateAge(item.family_birth_date)} thn`}
                  </td>
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                      disabled={deleteLoading ? true : false}
                    >
                      {deleteLoading ? "Loading..." : "- Hapus"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormFamily;
