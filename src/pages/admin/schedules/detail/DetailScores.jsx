import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Fragment, useState, useRef } from "react";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import * as XLSX from "xlsx";

const columns = [
  { label: "No", width: 30 },
  { label: "NIS", width: 80 },
  { label: "Nama", width: 200 },
  { label: "Kelas", width: 30 },
  { label: "Pg", width: 30 },
  { label: "Essay", width: 30 },
  { label: "Nilai", width: 30 },
];

const DetailScores = ({ data, quizname }) => {
  const [selectedClass, setClass] = useState("");

  const classes = [...new Set(data?.map((item) => item.class))];

  const filtering = (classname) => {
    return classname.class
      .toLowerCase()
      .includes(selectedClass.toLocaleLowerCase());
  };

  const filtered = data?.filter(filtering);

  //Export excel
  const tableRef = useRef(null);

  const convertToExcel = () => {
    if (tableRef.current) {
      const workbook = XLSX.utils.book_new();
      const table = tableRef.current;
      const tableData = XLSX.utils.table_to_sheet(table);

      XLSX.utils.book_append_sheet(workbook, tableData, "Sheet1");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const fileName = `Nilai_${quizname}.xlsx`;

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(data, fileName);
      } else {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(data);
        link.download = fileName;
        link.click();
      }
    }
  };

  return (
    <Fragment>
      <Paper sx={{ p: 1, display: "flex", gap: 1, justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setClass("")}
        >
          All
        </Button>
        {classes?.map((item) => (
          <Button
            key={item}
            variant="contained"
            color="primary"
            onClick={() => setClass(item)}
          >
            {item}
          </Button>
        ))}
        <Button
          variant="contained"
          color="warning"
          startIcon={<CloudDownloadOutlinedIcon />}
          onClick={convertToExcel}
        >
          Export
        </Button>
      </Paper>
      <Paper sx={{ overflow: "auto" }}>
        <TableContainer sx={{ maxHeight: { md: 530, lg: 550, xl: 640 } }}>
          <Table stickyHeader aria-label="sticky table" ref={tableRef}>
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
              {filtered?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{item.nis}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{item.class}</TableCell>
                  <TableCell align="center">{item.mcPoin}</TableCell>
                  <TableCell align="center">{item.essayPoin}</TableCell>
                  <TableCell align="center">{item.totalPoin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Fragment>
  );
};

export default DetailScores;
