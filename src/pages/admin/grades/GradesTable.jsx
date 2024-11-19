import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useDeleteGradeMutation } from "../../../state-control/api/gradeApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const colums = [
  { label: "Satuan", width: 170 },
  { label: "Tingkat", width: 170 },
  { label: "Aksi", width: 170 },
];

const GradesTable = ({ grades }) => {
  const [deleteGrade, { data, isSuccess, isLoading, error, reset }] =
    useDeleteGradeMutation();

  const deleteHandler = (id) => deleteGrade(id);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [data, isSuccess, error]);
  return (
    <Paper>
      <TableContainer
        sx={{ height: { xs: 500, md: 530, xl: 630 }, overflow: "auto" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {colums.map((item, index) => (
                <TableCell
                  align="center"
                  key={index}
                  sx={{ width: item.width }}
                >
                  {item.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {grades?.map((grade, index) => (
              <TableRow key={index}>
                <TableCell align="center">{grade.homebase}</TableCell>
                <TableCell align="center">{grade.grade}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => deleteHandler(grade.id)}>
                    <RemoveCircleIcon sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default GradesTable;
