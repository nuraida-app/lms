import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const columns = [
  { label: "No", width: 40 },
  { label: "Homebase", width: 100 },
  { label: "Actions", width: 100 },
];

const HomebaseTable = () => {
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
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default HomebaseTable;
