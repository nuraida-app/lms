import {
  Button,
  Grid,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { label: "No", width: 40 },
  { label: "Teacher", width: 150 },
  { label: "Subject", width: 150 },
  { label: "Actions", width: 40 },
];

const SubjectTable = () => {
  const navigate = useNavigate();

  const toSubject = () => navigate("/student/subjects/subject");

  return (
    <Paper>
      <TableContainer sx={{ height: { xs: 500, md: 586 }, overflow: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((item, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ width: item.width }}
                >
                  {item.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => toSubject()}
                >
                  Learning
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SubjectTable;
