import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import ClassIcon from "@mui/icons-material/Class";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StyleIcon from "@mui/icons-material/Style";
import WebIcon from "@mui/icons-material/Web";
import StorageIcon from "@mui/icons-material/Storage";
import { useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const Menus = () => {
  const { user } = useSelector((state) => state.authentication);

  // Default style untuk ikon
  const iconStyle = { color: "white" };

  // Definisi menu
  const menus = [
    {
      label: "Dashboard",
      link: "/student/dashboard",
      icon: <SpaceDashboardIcon sx={iconStyle} />,
    },
    {
      label: "Database",
      link: `/database/${user?.name}/${user?.nis}`,
      icon: <StorageIcon sx={iconStyle} />,
    },
    {
      label: "Mapel",
      link: "/student/subjects",
      icon: <FolderCopyIcon sx={iconStyle} />,
    },
    {
      label: "Ujain",
      link: "/student/exam",
      icon: <WebIcon sx={iconStyle} />,
    },
  ];

  return (
    <List>
      {menus.map((text, index) => (
        <ListItem key={index} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            component={Link}
            to={text.link}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {text.icon}
            </ListItemIcon>
            <ListItemText primary={text.label} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Menus;
