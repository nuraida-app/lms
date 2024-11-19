import React from "react";
import { Box, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

// Icons
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

const DataOne = ({ data }) => {
  const homebase = data?.homebase;
  const classes = data?.classes;
  const teachers = data?.teachers;
  const students = data?.students;

  const items = [
    {
      label: "Satuan",
      icon: <SchoolOutlinedIcon sx={{ color: "white", fontSize: 35 }} />,
      number: homebase,
    },
    {
      label: "Kelas",
      icon: <MapsHomeWorkOutlinedIcon sx={{ color: "white", fontSize: 35 }} />,
      number: classes,
    },
    {
      label: "Guru",
      icon: (
        <SupervisorAccountOutlinedIcon sx={{ color: "white", fontSize: 35 }} />
      ),
      number: teachers,
    },
    {
      label: "Siswa",
      icon: <PeopleAltOutlinedIcon sx={{ color: "white", fontSize: 35 }} />,
      number: students,
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {items?.map((item) => (
        <ListItem key={item.label} sx={{ bgcolor: "#1B8111", borderRadius: 1 }}>
          <ListItemAvatar>{item.icon}</ListItemAvatar>
          <ListItemText
            secondaryTypographyProps={{ sx: { color: "white" } }}
            primaryTypographyProps={{ sx: { color: "white" } }}
            sx={{ color: "white" }}
            primary={item.label}
            secondary={item.number}
          />
        </ListItem>
      ))}
    </Box>
  );
};

export default DataOne;
