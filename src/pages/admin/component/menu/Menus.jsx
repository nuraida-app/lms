import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import ClassIcon from "@mui/icons-material/Class";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StyleIcon from "@mui/icons-material/Style";

export const menus = [
  {
    label: "Dashboard",
    link: "/admin/dashboard",
    icon: <SpaceDashboardIcon sx={{ color: "white" }} />,
  },
  // {
  //   label: "Homebase",
  //   link: "/admin/homebase",
  //   icon: <HomeIcon sx={{ color: "white" }} />,
  // },
  {
    label: "Grades",
    link: "/admin/grades",
    icon: <AlignHorizontalLeftIcon sx={{ color: "white" }} />,
  },
  {
    label: "Classes",
    link: "/admin/classes",
    icon: <ClassIcon sx={{ color: "white" }} />,
  },
  {
    label: "Subjects",
    link: "/admin/subjects",
    icon: <StyleIcon sx={{ color: "white" }} />,
  },
  {
    label: "Teachers",
    link: "/admin/teachers",
    icon: <AssignmentIndIcon sx={{ color: "white" }} />,
  },

  {
    label: "Students",
    link: "/admin/students",
    icon: <PeopleAltIcon sx={{ color: "white" }} />,
  },
  {
    label: "Quizzes",
    link: "/admin/quizzes",
    icon: <FolderCopyIcon sx={{ color: "white" }} />,
  },
  {
    label: "Schedules",
    link: "/admin/schedules",
    icon: <CalendarMonthIcon sx={{ color: "white" }} />,
  },
];
