import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetYearsQuery } from "../../control/api/yearApi";
import {
  useAddStudentDataMutation,
  useGetDistrictsQuery,
  useGetRegenciesQuery,
  useGetVillagesQuery,
} from "../../control/api/dbApi";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid dates
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const FormStudent = ({ provinces, name, nis, student }) => {
  const page = "";
  const limit = "";
  const search = "";

  const [yearId, setYearId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [regencyId, setRegencyId] = useState("");
  const [districtId, setDistrictId] = useState("");

  const { data: rawData = {} } = useGetYearsQuery({ page, limit, search });
  const { data: years = [] } = rawData;

  const { data: regencies } = useGetRegenciesQuery(provinceId, {
    skip: !provinceId,
  });
  const { data: districts } = useGetDistrictsQuery(regencyId, {
    skip: !regencyId,
  });
  const { data: villages } = useGetVillagesQuery(districtId, {
    skip: !districtId,
  });

  const [addStudentData, { data, isSuccess, isLoading, error, reset }] =
    useAddStudentDataMutation();

  const [formData, setFormData] = useState({
    year_id: "",
    year: "",
    name: name,
    nisn: "",
    nis: nis,
    birth_place: "",
    birth_date: "",
    height: 0,
    weight: 0,
    around_head: 0,
    order_birth: 0,
    siblings: 1,
    province_id: "",
    province_name: "",
    regency_id: "",
    regency_name: "",
    district_id: "",
    district_name: "",
    village_id: "",
    village_name: "",
    district: "",
    address: "",
    postal_code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "year_id") {
      const selectedYear = years?.find((item) => item.id == value);
      setYearId(parseInt(value, 10));
      setFormData((prev) => ({
        ...prev,
        year_id: yearId,
        year: selectedYear ? selectedYear.name : "",
      }));
    }

    if (name === "province_id") {
      const selectedProvince = provinces?.find((item) => item.id === value);
      setProvinceId(value);
      setFormData((prev) => ({
        ...prev,
        province_id: value,
        province_name: selectedProvince ? selectedProvince.name : "",
        regency_id: "",
        district_id: "",
        village_id: "",
      }));
    }

    if (name === "regency_id") {
      const selectedRegency = regencies?.find((item) => item.id === value);
      setRegencyId(value);
      setFormData((prev) => ({
        ...prev,
        regency_id: value,
        regency_name: selectedRegency ? selectedRegency.name : "",
        district_id: "",
        village_id: "",
      }));
    }

    if (name === "district_id") {
      const selectedDistrict = districts?.find((item) => item.id === value);
      setDistrictId(value);
      setFormData((prev) => ({
        ...prev,
        district_id: value,
        district_name: selectedDistrict ? selectedDistrict.name : "",
        village_id: "",
      }));
    }

    if (name === "village_id") {
      const selectedVillage = villages?.find((item) => item.id === value);
      setFormData((prev) => ({
        ...prev,
        village_id: value,
        village_name: selectedVillage ? selectedVillage.name : "",
      }));
    }

    if (
      name !== "province_id" &&
      name !== "regency_id" &&
      name !== "district_id" &&
      name !== "village_id" &&
      name !== "year"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addStudentData(formData);
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
        year_id: student.year_id,
        year: student.year,
        name: student.name,
        nisn: student.nisn,
        nis: student.nis,
        birth_place: student.birth_place,
        birth_date: formatDate(student.birth_date),
        height: student.height,
        weight: student.weight,
        around_head: student.around_head,
        order_birth: student.order_birth,
        siblings: student.siblings,
        province_id: student.province_id.trim(),
        province_name: student.province_name,
        regency_id: student.regency_id.trim(),
        regency_name: student.regency_name,
        district_id: student.district_id.trim(),
        district_name: student.district_name,
        village_id: student.village_id.trim(),
        village_name: student.village_name,
        address: student.address,
        postal_code: student.postal_code,
      });

      setProvinceId(student.province_id.trim());
      setRegencyId(student.regency_id.trim());
      setDistrictId(student.district_id.trim());
    }
  }, [student]);

  return (
    <div className="container-fluid">
      <form className="p-2 rounded border shadow bg-white mt-2 row g-2">
        <div className="col-md-6 col-12 d-flex flex-column gap-3">
          <select
            className="form-select"
            aria-label="Default select example"
            name="year_id"
            value={formData.year_id || ""}
            onChange={handleChange}
          >
            <option value="" hidden>
              Pilih Tahun Pelajaran
            </option>
            {years?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="name"
            id="1"
            className="form-control"
            placeholder="Nama Lengkap"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nisn"
            id="2"
            className="form-control"
            placeholder="NISN"
            value={formData.nisn || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nis"
            id="3"
            className="form-control"
            placeholder="NIS"
            value={formData.nis || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="birth_place"
            id="4"
            className="form-control"
            placeholder="Tempat Lahir"
            value={formData.birth_place || ""}
            onChange={handleChange}
          />
          <input
            type="date"
            name="birth_date"
            id="5"
            className="form-control"
            placeholder="Tanggal Lahir"
            value={formData.birth_date || ""}
            onChange={handleChange}
          />
          <input
            type="number"
            name="order_birth"
            id="6"
            className="form-control"
            placeholder="Urutan Kelahiran"
            value={formData.order_birth || ""}
            onChange={handleChange}
          />
          <input
            type="number"
            name="height"
            id="7"
            className="form-control"
            placeholder="TB"
            value={formData.height || ""}
            onChange={handleChange}
          />
          <input
            type="number"
            name="weight"
            id="8"
            className="form-control"
            placeholder="BB"
            value={formData.weight || ""}
            onChange={handleChange}
          />
          <input
            type="number"
            name="around_head"
            id="9"
            className="form-control"
            placeholder="Lingkar Kepala"
            value={formData.around_head || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 col-12 d-flex flex-column gap-3">
          <select
            className="form-select"
            aria-label="Default select example"
            name="province_id"
            value={formData.province_id || ""}
            onChange={handleChange}
          >
            <option value="">Pilih Provinsi</option>
            {provinces?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            className="form-select"
            aria-label="Default select example"
            name="regency_id"
            value={formData.regency_id || ""}
            onChange={handleChange}
          >
            <option value="">Pilih Kota / Kabupaten</option>
            {regencies?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            className="form-select"
            aria-label="Default select example"
            name="district_id"
            value={formData.district_id || ""}
            onChange={handleChange}
          >
            <option value="">Pilih Kecamatan</option>
            {districts?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            className="form-select"
            aria-label="Default select example"
            name="village_id"
            value={formData.village_id || ""}
            onChange={handleChange}
          >
            <option value="">Pilih Desa</option>
            {villages?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="postal_code"
            id="11"
            className="form-control"
            placeholder="Kode Pos"
            value={formData.postal_code || ""}
            onChange={handleChange}
          />

          <textarea
            name="adress"
            id="10"
            rows="6"
            className="form-control"
            placeholder="Alamat"
            value={formData.address || ""}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="text-end">
          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={isLoading ? true : false}
          >
            {isLoading ? "loading..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStudent;
