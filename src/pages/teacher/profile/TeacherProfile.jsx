import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Classes from "./Classes";
import { useSelector } from "react-redux";

const TeacherProfile = () => {
  const { user } = useSelector((state) => state.authentication);

  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setNip(user.nip);
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ px: 1 }}>
          <Paper sx={{ p: 1 }}>
            <Typography fontWeight="bold" sx={{ mb: 2 }}>
              Profile
            </Typography>

            <form
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextField
                fullWidth
                label="NIP"
                InputLabelProps={{ shrink: true }}
                value={nip || ""}
                onChange={(e) => setNip(e.target.value)}
              />

              <TextField
                fullWidth
                label="Name"
                InputLabelProps={{ shrink: true }}
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                type="email"
                fullWidth
                label="Email"
                placeholder="Add Email"
                InputLabelProps={{ shrink: true }}
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                fullWidth
                label="Phone"
                placeholder="Add Phone"
                InputLabelProps={{ shrink: true }}
                value={phone || ""}
                onChange={(e) => setPhone(e.target.value)}
              />

              <TextField
                fullWidth
                label="Password"
                placeholder="Change password if it's needed"
                InputLabelProps={{ shrink: true }}
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Box align="end">
                <Button variant="contained" color="success">
                  Save
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{ px: 1 }}>
          <Classes />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default TeacherProfile;
