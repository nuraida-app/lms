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

export const menus = [
  {
    label: "Dashboard",
    link: "/student/dashboard",
    icon: <SpaceDashboardIcon sx={{ color: "white" }} />,
  },
  {
    label: "Subjects",
    link: "/student/subjects",
    icon: <FolderCopyIcon sx={{ color: "white" }} />,
  },
  {
    label: "Exam",
    link: "/student/exam",
    icon: <WebIcon sx={{ color: "white" }} />,
  },
];
