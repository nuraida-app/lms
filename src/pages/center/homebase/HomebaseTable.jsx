import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDeleteHomebaseMutation } from "../../../state-control/api/homebaseApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const columns = [
  { label: "No", width: 40 },
  { label: "Satuan", width: 100 },
  { label: "Aksi", width: 100 },
];

const HomebaseTable = ({ data }) => {
  const [deleteHomebase, { data: msg, isSuccess, isLoading, error, reset }] =
    useDeleteHomebaseMutation();

  const delHandler = (id) => deleteHomebase(id);

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [msg, isSuccess, error]);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxheight: 585 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((text, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ width: text.width }}
                >
                  {text.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => delHandler(item.id)}>
                    {isLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <RemoveCircleOutlineIcon />
                    )}
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

export default HomebaseTable;
