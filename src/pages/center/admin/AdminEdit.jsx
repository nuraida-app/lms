import {
  Box,
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

const AdminEdit = ({ open, close, admin }) => {
  const { data } = useGetHomebasesQuery();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("--Choose Role--");
  const [homebase_id, setHomebase] = useState("--Choose Homebase--");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (admin) {
      setName(admin.name);
      setEmail(admin.email);
      setRole(admin.role);
      setHomebase(admin.homebase_id ? admin.homebase_id : null);
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
          >
            <TextField
              label="Name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Email"
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
                <MenuItem value="--Choose Role--">--Choose Role--</MenuItem>
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
                  <MenuItem value="--Choose Homebase--">
                    --Choose Homebase--
                  </MenuItem>
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
              type="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AdminEdit;
