import {
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetHomebasesQuery } from "../../../state-control/api/homebaseApi";
import {
  useAddAdminMutation,
  useEditAdminMutation,
} from "../../../state-control/api/adminApi";
import { toast } from "react-toastify";

const Admin = ({ open, close, admin }) => {
  const { data } = useGetHomebasesQuery();
  const [addAdmin, { data: msg, isSuccess, isLoading, error, reset }] =
    useAddAdminMutation();
  const [
    editAdmin,
    {
      data: editMsg,
      isSuccess: editSuccess,
      isLoading: editLoading,
      error: editError,
      reset: editReset,
    },
  ] = useEditAdminMutation();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("--Role--");
  const [homebase_id, setHomebase] = useState("--Homebase--");
  const [password, setPassword] = useState("");

  const addhandler = (e) => {
    e.preventDefault();

    if (id) {
      const data = { name, email, password, role, homebase_id, id };

      editAdmin(data);
    } else {
      const data = { name, email, password, role, homebase_id };

      addAdmin(data);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();
      setId("");
      setName("");
      setEmail("");
      setPassword("");
      setRole("--Role--");
      setHomebase("--Homebase--");
      close();
      window.location.reload();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [msg, isSuccess, error]);

  useEffect(() => {
    if (editSuccess) {
      toast.success(editMsg.message);

      setId("");
      setName("");
      setEmail("");
      setPassword("");
      setRole("--Role--");
      setHomebase("--Homebase--");
      close();

      editReset();
      window.location.reload();
    }

    if (editError) {
      toast.error(editError.data.message);
      editReset();
    }
  }, [editSuccess, editMsg, editError]);

  useEffect(() => {
    if (admin) {
      setName(admin.name);
      setEmail(admin.email);
      setRole(admin.role);
      setHomebase(admin.homebase_id ? admin.homebase_id : null);
      setId(admin.id);
    }
  }, [admin]);
  return (
    <Modal open={open} onClose={close} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            borderRadius: "5px",
          }}
        >
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            onSubmit={addhandler}
          >
            <TextField
              label="Name"
              placeholder="Name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Email"
              placeholder="Email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="--Role--">--Role--</MenuItem>
                <MenuItem value="super-admin">Super Admin</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            {role === "admin" && (
              <FormControl fullWidth>
                <InputLabel>Homebase</InputLabel>
                <Select
                  label="Homebase"
                  value={homebase_id}
                  onChange={(e) => setHomebase(e.target.value)}
                >
                  <MenuItem value="--Homebase--">--Homebase--</MenuItem>
                  {data?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <TextField
              label="Password"
              placeholder="Password"
              type="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <Box alignSelf="end">
              <Button
                variant="contained"
                color="error"
                onClick={close}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button variant="contained" color="success" type="submit">
                {isLoading || editLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  " Save"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Admin;
