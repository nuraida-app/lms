import {
  Box,
  IconButton,
  keyframes,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";

const createGrowAnimation = (percentage) => keyframes`
  from {
    width: 0;
  }
  to {
    width: ${percentage}%;
  }
`;

const DbTable = ({ students, database }) => {
  const navigate = useNavigate();

  const toPage = (student, nis) => {
    const formattedName = student.replace(/\s+/g, "-");
    navigate(`/teacher/${formattedName}/${nis}`);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ height: { xs: 500, md: 530, lg: 600 }, overflow: "auto" }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {["No", "NIS", "Full Name", "Class", "Action", "Status"].map(
              (item) => (
                <TableCell key={item} align="center">
                  {item}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {students?.map((student, index) => {
            const foundData = database?.find((d) => d.nis === student.nis);

            // Calculate the percentage of filled fields
            const filledFields = foundData
              ? Object.values(foundData).filter(
                  (value) => value !== null && value !== ""
                ).length
              : 0;
            const percentage = (filledFields / 41) * 100;
            const formated = percentage.toFixed();

            // Create a unique animation for each percentage
            const growAnimation = createGrowAnimation(percentage);

            return (
              <TableRow key={student.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{student.nis}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell align="center">{student.class}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="success"
                    onClick={() => toPage(student.name, student.nis)}
                  >
                    <LaunchIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      borderRadius: 1,
                      bgcolor: "#387F39",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 0.5,
                      color: "white",
                      animation: `${growAnimation} 1.5s ease-out`,
                      width: `${percentage}%`,
                    }}
                  >
                    {percentage > 0 ? `${formated}%` : 0}
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DbTable;
