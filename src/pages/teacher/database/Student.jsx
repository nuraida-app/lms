import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  useAddStudentDataMutation,
  useGetDistrictsQuery,
  useGetRegenciesQuery,
  useGetVillagesQuery,
} from "../../../state-control/api/dbApi";
import { toast } from "react-toastify";

const Student = ({ provinces, info, name, nis }) => {
  const [provinceId, setProvinceId] = useState("");
  const [regencyId, setRegencyId] = useState("");
  const [districtId, setDistrictId] = useState("");

  const [
    addStudentData,
    { data: message, isSuccess, error, isLoading, reset },
  ] = useAddStudentDataMutation();
  const { data: regencies } = useGetRegenciesQuery(provinceId, {
    skip: !provinceId,
  });
  const { data: districts } = useGetDistrictsQuery(regencyId, {
    skip: !regencyId,
  });
  const { data: villages } = useGetVillagesQuery(districtId, {
    skip: !districtId,
  });

  const [formData, setFormData] = useState({
    name: name,
    nisn: "",
    nis: nis,
    birth_place: "",
    birth_date: dayjs(),
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

    if (name === "province_id") {
      const selectedProvince = provinces?.find((item) => item.id === value);
      setProvinceId(value);
      setFormData({
        ...formData,
        province_id: value,
        province_name: selectedProvince ? selectedProvince.name : "",
      });
    }

    if (name === "regency_id") {
      const selectedRegency = regencies?.find((item) => item.id === value);
      setRegencyId(value);
      setFormData({
        ...formData,
        regency_id: value,
        regency_name: selectedRegency ? selectedRegency.name : "",
      });
    }

    if (name === "district_id") {
      const selectedDistrict = districts?.find((item) => item.id === value);
      setDistrictId(value);
      setFormData({
        ...formData,
        district_id: value,
        district_name: selectedDistrict ? selectedDistrict.name : "",
      });
    }

    if (name === "village_id") {
      const selectedVillage = villages?.find(
        (item) => item.id.trim() === value.trim()
      );
      setFormData({
        ...formData,
        village_id: value,
        village_name: selectedVillage ? selectedVillage.name : "",
      });
    }

    if (
      name !== "province_id" &&
      name !== "regency_id" &&
      name !== "district_id" &&
      name !== "village_id"
    ) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birth_date: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudentData(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, error, message]);

  useEffect(() => {
    if (info) {
      setFormData({
        name: info.name,
        nisn: info.nisn,
        nis: info.nis,
        birth_place: info.birth_place,
        birth_date: info.birth_date ? dayjs(info.birth_date) : dayjs(),
        height: info.height,
        weight: info.weight,
        around_head: info.around_head,
        order_birth: info.order_birth,
        siblings: info.siblings,
        province_id: info.province_id,
        province_name: info.province_name,
        regency_id: info.regency_id,
        regency_name: info.regency_name,
        district_id: info.district_id,
        district_name: info.district_name,
        village_id: info.village_id.trim(),
        village_name: info.village_name,
        address: info.address,
        postal_code: info.postal_code,
      });

      setProvinceId(info.province_id);
      setRegencyId(info.regency_id);
      setDistrictId(info.district_id);
    }
  }, [info]);

  return (
    <Paper sx={{ width: "100%", p: 1 }}>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ p: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              label="Nama Lengkap"
              size="small"
              variant="standard"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="NISN"
              size="small"
              variant="standard"
              name="nisn"
              value={formData.nisn || ""}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="NIS"
              size="small"
              variant="standard"
              name="nis"
              value={formData.nis || ""}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Tempat Lahir"
              size="small"
              variant="standard"
              name="birth_place"
              value={formData.birth_place || ""}
              onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Tanggal Lahir"
                value={formData.birth_date || ""}
                onChange={handleDateChange}
                slotProps={{
                  textField: { fullWidth: true, variant: "standard" },
                }}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              type="number"
              label="Anak Ke"
              size="small"
              variant="standard"
              name="order_birth"
              value={formData.order_birth || 0}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="number"
              label="Jml Saudara Kandung"
              size="small"
              variant="standard"
              name="siblings"
              value={formData.siblings || 1}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="number"
              label="Tinggi"
              size="small"
              variant="standard"
              name="height"
              value={formData.height || 0}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="number"
              label="Berat"
              size="small"
              variant="standard"
              name="weight"
              value={formData.weight || 0}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ p: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              type="number"
              label="Lingkar Kepala"
              size="small"
              variant="standard"
              name="around_head"
              value={formData.around_head || 0}
              onChange={handleChange}
            />
            <FormControl fullWidth variant="standard">
              <InputLabel>--Provinsi--</InputLabel>
              <Select
                name="province_id"
                value={formData.province_id || ""}
                onChange={handleChange}
              >
                {provinces?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {provinceId && (
              <FormControl fullWidth variant="standard">
                <InputLabel>--Kota / Kabupaten--</InputLabel>
                <Select
                  name="regency_id"
                  value={formData.regency_id || ""}
                  onChange={handleChange}
                >
                  {regencies?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {regencyId && (
              <FormControl fullWidth variant="standard">
                <InputLabel>--Kecamatan--</InputLabel>
                <Select
                  name="district_id"
                  value={formData.district_id || ""}
                  onChange={handleChange}
                >
                  {districts?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {districtId && (
              <FormControl fullWidth variant="standard">
                <InputLabel>--Desa--</InputLabel>
                <Select
                  name="village_id"
                  value={formData.village_id || ""}
                  onChange={handleChange}
                >
                  {villages?.map((item) => (
                    <MenuItem key={item.id.trim()} value={item.id.trim()}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <TextField
              fullWidth
              label="Alamat"
              size="small"
              variant="standard"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Kode Pos"
              size="small"
              variant="standard"
              name="postal_code"
              value={formData.postal_code || ""}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained" color="success" type="submit">
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "simpan"
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Student;
