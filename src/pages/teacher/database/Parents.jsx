import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAddParentsDataMutation } from "../../../state-control/api/dbApi";

const convertPhoneNumber = (phone) => {
  if (phone?.startsWith("0")) {
    return `62${phone.slice(1)}`;
  }
  return phone;
};

const formatCurrency = (value) => {
  const number = value.replace(/[^\d]/g, "");
  return `Rp ${parseInt(number, 10).toLocaleString("id-ID")}`;
};

const parseCurrency = (value) => {
  return value.replace(/[^\d]/g, ""); // remove 'Rp' and any non-numeric characters
};

const Parents = ({ info }) => {
  const [
    addParentsData,
    { data: message, isSuccess, isLoading, error, reset },
  ] = useAddParentsDataMutation();

  const [formData, setFormData] = useState({
    father_nik: "",
    father_name: "",
    father_birth_place: "",
    father_birth_date: dayjs(),
    father_job: "",
    father_position: "",
    father_earning: 0,
    father_phone: "",
    mother_nik: "",
    mother_name: "",
    mother_birth_place: "",
    mother_birth_date: dayjs(),
    mother_job: "",
    mother_position: "",
    mother_earning: 0,
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

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: formatCurrency(value),
    });
  };

  const handleDateFather = (date) => {
    setFormData({
      ...formData,
      father_birth_date: date,
    });
  };

  const handleDateMother = (date) => {
    setFormData({
      ...formData,
      mother_birth_date: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove formatting before sending the data
    const dataToSubmit = {
      ...formData,
      father_earning: parseCurrency(formData.father_earning),
      mother_earning: parseCurrency(formData.mother_earning),
    };
    addParentsData(dataToSubmit);
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
        father_nik: info.father_nik,
        father_name: info.father_name,
        father_birth_place: info.father_birth_place,
        father_birth_date: info.father_birth_date
          ? dayjs(info.father_birth_date)
          : dayjs(),
        father_job: info.father_job,
        father_position: info.father_position,
        father_earning: info.father_earning
          ? formatCurrency(info.father_earning)
          : 0,
        father_phone: convertPhoneNumber(info.father_phone),
        mother_nik: info.mother_nik,
        mother_name: info.mother_name,
        mother_birth_place: info.mother_birth_place,
        mother_birth_date: info.mother_birth_date
          ? dayjs(info.mother_birth_date)
          : dayjs(),
        mother_job: info.mother_job,
        mother_position: info.mother_position,
        mother_earning: info.mother_earning
          ? formatCurrency(info.mother_earning)
          : 0,
        mother_phone: convertPhoneNumber(info.mother_phone),
        nis: info.nis,
      });
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
            sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1 }}
          >
            <TextField
              fullWidth
              type="number"
              label="Father NIK"
              size="small"
              variant="standard"
              name="father_nik"
              value={formData.father_nik || ""}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Father Name"
              size="small"
              variant="standard"
              name="father_name"
              value={formData.father_name || ""}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Father Birth Place"
              size="small"
              variant="standard"
              name="father_birth_place"
              value={formData.father_birth_place || ""}
              onChange={handleChange}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Father Birth Date"
                value={formData.father_birth_date}
                onChange={handleDateFather}
                slotProps={{
                  textField: { fullWidth: true, variant: "standard" },
                }}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              label="Father Job"
              size="small"
              variant="standard"
              name="father_job"
              value={formData.father_job || ""}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Father Position"
              size="small"
              variant="standard"
              name="father_position"
              value={formData.father_position || ""}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Father Earning"
              size="small"
              variant="standard"
              name="father_earning"
              onChange={handleCurrencyChange}
              value={formData.father_earning || ""}
            />

            <TextField
              fullWidth
              type="number"
              label="Father Phone"
              size="small"
              variant="standard"
              name="father_phone"
              onChange={handleChange}
              value={formData.father_phone || ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1 }}
          >
            <TextField
              fullWidth
              type="number"
              label="Mohter NIK"
              size="small"
              variant="standard"
              name="mother_nik"
              value={formData.mother_nik || ""}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Mother Name"
              size="small"
              variant="standard"
              name="mother_name"
              value={formData.mother_name || ""}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Mother Birth Place"
              size="small"
              variant="standard"
              name="mother_birth_place"
              value={formData.mother_birth_place || ""}
              onChange={handleChange}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Mother Birth Date"
                value={formData.mother_birth_date}
                onChange={handleDateMother}
                slotProps={{
                  textField: { fullWidth: true, variant: "standard" },
                }}
              />
            </LocalizationProvider>

            <TextField
              fullWidth
              label="Mother Job"
              size="small"
              variant="standard"
              name="mother_job"
              value={formData.mother_job || ""}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Mother Position"
              size="small"
              variant="standard"
              name="mother_position"
              value={formData.mother_position || ""}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Mother Earning"
              size="small"
              variant="standard"
              name="mother_earning"
              onChange={handleCurrencyChange}
              value={formData.mother_earning || ""}
            />

            <TextField
              fullWidth
              type="number"
              label="Mother phone"
              size="small"
              variant="standard"
              name="mother_phone"
              onChange={handleChange}
              value={formData.mother_phone || ""}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained" color="success" type="submit">
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "save"
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Parents;
