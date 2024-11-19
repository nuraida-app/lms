import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import StorageIcon from "@mui/icons-material/Storage";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StyleIcon from "@mui/icons-material/Style";
import { useSelector } from "react-redux";

export const menus = () => {
  const { user } = useSelector((state) => state.authentication);

  const menuItems = [
    {
      label: "Dashboard",
      link: "/teacher/dashboard",
      icon: <SpaceDashboardIcon sx={{ color: "white" }} />,
    },
    {
      label: "Mata Pelajaran",
      link: "/teacher/subjects",
      icon: <StyleIcon sx={{ color: "white" }} />,
    },
    {
      label: "Bank Soal",
      link: "/teacher/quizzes",
      icon: <FolderCopyIcon sx={{ color: "white" }} />,
    },
    {
      label: "Jadwal Ujian",
      link: "/teacher/schedules",
      icon: <CalendarMonthIcon sx={{ color: "white" }} />,
    },
  ];

  // Tampilkan menu "Database" jika user.homeroom bernilai 1
  if (user?.homeroom === 1) {
    menuItems.splice(1, 0, {
      label: "Database",
      link: "/database",
      icon: <StorageIcon sx={{ color: "white" }} />,
    });
  }

  return menuItems;
};
