import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const DetailQuiz = () => {
  return (
    <Grid container sx={{ bgcolor: "white" }}>
      <Grid item xs={12} md={6} sx={{ p: 1 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Teacher</TableCell>
              <TableCell>:</TableCell>
              <TableCell>Nama Guru</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Quiz</TableCell>
              <TableCell>:</TableCell>
              <TableCell>Nama Quiz</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Grade</TableCell>
              <TableCell>:</TableCell>
              <TableCell>10</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell>:</TableCell>
              <TableCell>11111</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={12} md={6} sx={{ p: 1 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Start</TableCell>
              <TableCell>:</TableCell>
              <TableCell>Waktu Mulai</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>End</TableCell>
              <TableCell>:</TableCell>
              <TableCell>Waktu Selesai</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Duration</TableCell>
              <TableCell>:</TableCell>
              <TableCell>10 Menit</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>:</TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ "&:hover": { cursor: "pointer" }, color: "green" }}
                >
                  Active
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default DetailQuiz;
