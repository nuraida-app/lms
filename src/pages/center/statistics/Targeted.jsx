import React from "react";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetTargetedQuery } from "../../../state-control/api/dbApi";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const Targeted = () => {
  const { data } = useGetTargetedQuery();

  return (
    <TableContainer sx={{ height: { xs: 500, md: 550, lg: 680, xl: 790 } }}>
      <Typography variant="h6">Targeted New Student</Typography>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {["Student", "Target Name", "Phone"].map((item) => (
              <TableCell key={item} align="center">
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.student_name}</TableCell>

              <TableCell align="center">
                {row.family?.map((fam, index) => (
                  <ListItemButton key={index}>
                    <ListItemIcon>
                      <PersonOutlineOutlinedIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary={fam.target_name}
                      secondary={`Age ${fam.age}`}
                    />
                  </ListItemButton>
                ))}
              </TableCell>
              <TableCell>
                <ListItemButton
                  onClick={() =>
                    window.open(
                      `https://wa.me/${row.phone.father_phone}`,
                      "_blank"
                    )
                  }
                >
                  <ListItemIcon>
                    <WhatsAppIcon color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ayah"
                    secondary={row.phone.father_phone}
                  />
                </ListItemButton>

                <ListItemButton
                  onClick={() =>
                    window.open(
                      `https://wa.me/${row.phone.mother_phone}`,
                      "_blank"
                    )
                  }
                >
                  <ListItemIcon>
                    <WhatsAppIcon color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ibu"
                    secondary={row.phone.mother_phone}
                  />
                </ListItemButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Targeted;
