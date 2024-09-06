import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  useAddHealthDataMutation,
  useDeleteHealthDataMutation,
} from "../../../state-control/api/dbApi";
import { toast } from "react-toastify";

const Health = ({ info }) => {
  const [addHealthData, { data, isLoading, isSuccess, error, reset }] =
    useAddHealthDataMutation();
  const [
    deleteHealthData,
    {
      isSuccess: deleteSuccess,
      data: message,
      isLoading: deleteLoading,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteHealthDataMutation();

  // Initialize healthData with health_info if available
  const [healthData, setHealthData] = useState(info?.health_records || []);

  const [formData, setFormData] = useState({
    health_notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    // Create a new health entry with a unique ID
    const newHealthEntry = {
      ...formData,
      id: Date.now(),
    };

    // Update the UI immediately
    setHealthData((prevHealthData) => [...prevHealthData, newHealthEntry]);

    // Prepare payload to save to the database
    const payload = {
      nis: info?.nis,
      healthData: [...healthData, newHealthEntry].map((item) => ({
        ...item,
        id: item.id,
      })),
    };

    // Save the new health data to the database
    addHealthData(payload);

    // Reset form data
    setFormData({
      health_notes: "",
    });
  };

  const handleDelete = (id) => {
    const payload = {
      nis: info?.nis,
      healthId: id,
    };

    deleteHealthData(payload)
      .unwrap()
      .then(() => {
        setHealthData(healthData.filter((item) => item.id !== id));
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
  }, [data, isSuccess, error, reset]);

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
                  {["No", "Note", "Actions"].map((item) => (
                    <TableCell key={item}>{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {healthData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.health_notes}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        {isLoading ? (
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
              required
              size="small"
              variant="standard"
              label="Health Notes"
              name="health_notes"
              value={formData.health_notes}
              onChange={handleChange}
            />

            <Button fullWidth variant="contained" color="success" type="submit">
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Add"
              )}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Health;
