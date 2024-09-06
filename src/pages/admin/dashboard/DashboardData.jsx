import { Box, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import { useGetTeachersQuery } from "../../../state-control/api/teacherApi";
import { useGetStudentByHomebaseQuery } from "../../../state-control/api/studentApi";
import { useGetClassesQuery } from "../../../state-control/api/classApi";
import { useGetSubjectsQuery } from "../../../state-control/api/subjectApi";

const DashboardData = () => {
  const { data: students } = useGetStudentByHomebaseQuery();
  const { data: classes } = useGetClassesQuery();
  const { data: teachers } = useGetTeachersQuery();
  const { data: subjects } = useGetSubjectsQuery();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        bgcolor: "white",
        boxShadow: 2,
        p: 1,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          p: 2,
          width: { xs: 115, md: 150 },
          borderRadius: 1,
          alignItems: "center",
          justifyContent: "start",
          bgcolor: "#0AFF7E",
          color: "#0E213B",
        }}
      >
        <PeopleAltOutlinedIcon sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="body" fontWeight="bold">
            Students
          </Typography>
          <Typography variant="body2">{students?.length}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          p: 2,
          width: { xs: 115, md: 150 },
          borderRadius: 1,
          alignItems: "center",
          justifyContent: "start",
          bgcolor: "#0AFF7E",
          color: "#0E213B",
        }}
      >
        <FolderSharedOutlinedIcon sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="body" fontWeight="bold">
            Class
          </Typography>
          <Typography variant="body2">{classes?.length}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          p: 2,
          width: { xs: 115, md: 150 },
          borderRadius: 1,
          alignItems: "center",
          justifyContent: "start",
          bgcolor: "#0AFF7E",
          color: "#0E213B",
        }}
      >
        <AssignmentIndIcon sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="body" fontWeight="bold">
            Teachers
          </Typography>
          <Typography variant="body2">{teachers?.length}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          p: 2,
          width: { xs: 115, md: 150 },
          borderRadius: 1,
          alignItems: "center",
          justifyContent: "start",
          bgcolor: "#0AFF7E",
          color: "#0E213B",
        }}
      >
        <BookOutlinedIcon sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="body" fontWeight="bold">
            Subjects
          </Typography>
          <Typography variant="body2">{subjects?.length}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardData;
