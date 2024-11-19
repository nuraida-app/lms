import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  useAddFamilyDataMutation,
  useDeleteFamilyDataMutation,
} from "../../../state-control/api/dbApi";
import { toast } from "react-toastify";

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

const Family = ({ info }) => {
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

  const [familyData, setFamilyData] = useState(info?.family_info || []);

  const [formData, setFormData] = useState({
    family_name: "",
    family_gender: "",
    family_birth_date: dayjs(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, family_birth_date: date });
  };

  const handleAdd = () => {
    const newFamilyMember = {
      family_name: formData.family_name,
      family_gender: formData.family_gender,
      family_birth_date: formData.family_birth_date,
      id: Date.now(),
    };

    // Save the new family member to the database
    const payload = {
      nis: info.nis,
      familyData: [...familyData, newFamilyMember],
    };

    addFamilyData(payload)
      .unwrap()
      .then(() => {
        // Update local state only after successful API call
        setFamilyData((prevFamilyData) => [...prevFamilyData, newFamilyMember]);

        // Reset form data
        setFormData({
          family_name: "",
          family_gender: "",
          family_birth_date: dayjs(),
        });
      });
  };

  const handleDelete = (id) => {
    const payload = {
      nis: info.nis,
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
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 1,
      }}
    >
      <Grid container>
        <Grid item xs={12} md={8} sx={{ p: 1 }}>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: { xs: 500, md: 450, lg: 530 },
              overflow: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "No",
                    "Nama",
                    "Kelamin",
                    "Tanggal Lahir",
                    "Usia",
                    "Aksi",
                  ].map((item) => (
                    <TableCell key={item}>{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {familyData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.family_name}</TableCell>
                    <TableCell>{item.family_gender}</TableCell>
                    <TableCell>
                      {dayjs(item.family_birth_date).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      {calculateAge(item.family_birth_date)}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        {deleteLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <RemoveIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={4} sx={{ p: 1 }}>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <TextField
              fullWidth
              size="small"
              variant="standard"
              label="Nama"
              name="family_name"
              value={formData.family_name}
              onChange={handleChange}
              required
            />

            <FormControl required>
              <InputLabel>-Kelamin--</InputLabel>
              <Select
                label="--Kelamin--"
                name="family_gender"
                value={formData.family_gender}
                onChange={handleChange}
              >
                <MenuItem value={"Male"}>Pria</MenuItem>
                <MenuItem value={"Female"}>Wanita</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Tanggal Lahir"
                name="family_birth_date"
                value={formData.family_birth_date}
                onChange={handleDateChange}
                slotProps={{
                  textField: { fullWidth: true, variant: "standard" },
                }}
              />
            </LocalizationProvider>

            <Button fullWidth variant="contained" color="success" type="submit">
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "simpan"
              )}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Family;
