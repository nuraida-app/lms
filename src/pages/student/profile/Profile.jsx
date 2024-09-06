import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const calculateAge = (birthDateString) => {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} y ${months} m`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

const Profile = ({ profile }) => {
  return (
    <Grid container>
      <Grid item xs={12} md={9} sx={{ p: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Typography fontWeight={700}>Personal Information</Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{profile?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NISN</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{profile?.nisn}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIS</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{profile?.nis}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Birth Place</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{profile?.birth_place}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Birth Date</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{`${formatDate(profile?.birth_date)} (${calculateAge(
                  profile?.birth_date
                )})`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Province</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{profile?.province_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Regency</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{profile?.regency_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>District</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{profile?.district_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Village</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{profile?.village_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{profile?.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Postal Code</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{profile?.postal_code}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Paper sx={{ p: 2, mt: 1 }}>
          <Typography fontWeight={700}>Parents Information</Typography>
          <Grid container>
            <Grid item xs={12} md={6} sx={{ p: 1 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>NIK</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{profile?.father_nik}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{profile?.father_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Birth Place</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{profile?.father_birth_place}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Birth Date</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{`${formatDate(
                      profile?.father_birth_date
                    )} (${calculateAge(
                      profile?.father_birth_date
                    )})`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Father Job</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{profile?.father_job}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Father Position</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{profile?.father_position}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fathers' Earning</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>
                      {`Rp ${parseFloat(profile?.father_earning).toLocaleString(
                        "id-ID"
                      )}`}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={12} md={6} sx={{ p: 1 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>NIK</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{profile?.mother_nik}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{profile?.mother_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Birth Place</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{profile?.mother_birth_place}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Birth Date</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{`${formatDate(
                      profile?.mother_birth_date
                    )} (${calculateAge(
                      profile?.mother_birth_date
                    )})`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mother Job</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{profile?.mother_job}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mother Position</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{profile?.mother_position}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mothers' Earning</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>
                      {`Rp ${parseFloat(profile?.mother_earning).toLocaleString(
                        "id-ID"
                      )}`}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 2, mt: 1 }}>
          <Typography fontWeight={700}>Family Information</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {["No", "Name", "Gender", "Birth Date", "Age"].map((item) => (
                  <TableCell align="center" key={item}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {profile?.family_info.map((f, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{f.family_name}</TableCell>
                  <TableCell align="center">{f.family_gender}</TableCell>
                  <TableCell align="center">
                    {formatDate(f.family_birth_date)}
                  </TableCell>
                  <TableCell align="center">
                    {calculateAge(f.family_birth_date)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3} sx={{ p: 1 }}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography fontWeight={700}>Health Records</Typography>
          <Typography>Height {profile?.height} cm</Typography>
          <Typography>weight {profile?.weight} cm</Typography>
          <Typography>Around Head {profile?.around_head} cm</Typography>
          {profile?.health_records?.map((item, index) => (
            <Typography key={index}>{item.health_notes}</Typography>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
