import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React from "react";

// Icons
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const Menus = [
  {
    label: "Dashboard",
    icon: <HomeIcon color="success" />,
    link: "/admin-center",
  },
  {
    label: "Admin",
    icon: <AdminPanelSettingsIcon color="success" />,
    link: "/admin-center/admin",
  },
  {
    label: "Teachers",
    icon: <SupervisorAccountOutlinedIcon color="success" />,
    link: "/admin-center/teachers",
  },
  {
    label: "Students",
    icon: <PeopleAltIcon color="success" />,
    link: "/admin-center/students",
  },
  {
    label: "Statistic",
    icon: <DonutLargeIcon color="success" />,
    link: "/admin-center/statistic",
  },
  {
    label: "Setting",
    icon: <SettingsIcon color="success" />,
    link: "/admin-center/setting",
  },
];

const ListMenu = () => {
  return (
    <Box sx={{ height: "100vh", overflow: "auto", bgcolor: "white" }}>
      <List>
        <ListSubheader>Admin Center</ListSubheader>
        {Menus.map((item) => (
          <ListItem>
            <ListItemButton key={item.label} component={Link} to={item.link}>
              <ListItemAvatar>{item.icon}</ListItemAvatar>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListMenu;
