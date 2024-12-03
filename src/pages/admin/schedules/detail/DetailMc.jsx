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
  { label: "No", width: 70 },
  { label: "NIS", width: 100 },
  { label: "Nama", width: 250 },
  { label: "Kelas", width: 50 },
];

const DetailMc = ({ data, questions, quizname }) => {
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
      const fileName = `Analisis_${quizname}.xlsx`;

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
      <Paper
        sx={{
          overflow: "auto",
          width: { md: 850, lg: 1080, xl: 1300 },
        }}
      >
        <TableContainer sx={{ maxHeight: { md: 480, xl: 570 } }}>
          <Table stickyHeader aria-label="sticky table" ref={tableRef}>
            <TableHead>
              <TableRow>
                {columns.map((item, index) => (
                  <TableCell
                    rowSpan={2}
                    key={index}
                    align="center"
                    sx={{ minWidth: item.width }}
                  >
                    {item.label}
                  </TableCell>
                ))}
                {questions
                  ?.filter((q) => q.type === 1)
                  .map((item, index) => (
                    <TableCell key={index} align="center" sx={{ minWidth: 50 }}>
                      {index + 1}
                    </TableCell>
                  ))}
                <TableCell rowSpan={2} align="center">
                  Benar
                </TableCell>
                <TableCell rowSpan={2} align="center">
                  Salah
                </TableCell>
                <TableCell rowSpan={2} align="center">
                  Nilai
                </TableCell>
              </TableRow>
              <TableRow>
                {questions
                  ?.filter((q) => q.type === 1)
                  .map((item, index) => (
                    <TableCell key={index} align="center" sx={{ minWidth: 50 }}>
                      {item.key}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered?.map((item, index) => (
                <Fragment key={index}>
                  <TableRow>
                    <TableCell align="center" rowSpan={2}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="center" rowSpan={2}>
                      {item.nis}
                    </TableCell>
                    <TableCell rowSpan={2}>{item.name}</TableCell>
                    <TableCell align="center" rowSpan={2}>
                      {item.class}
                    </TableCell>
                    {/* Loop through questions and find matching answers */}
                    {questions
                      ?.filter((q) => q.type === 1)
                      .map((question, questionIndex) => {
                        const answer = item.answers.find(
                          (ans) => ans.questionId === question.id
                        );
                        return (
                          <TableCell key={questionIndex} align="center">
                            {answer ? answer.mc : "-"}
                          </TableCell>
                        );
                      })}
                    <TableCell align="center" rowSpan={2}>
                      {item.correct}
                    </TableCell>
                    <TableCell align="center" rowSpan={2}>
                      {item.wrong}
                    </TableCell>
                    <TableCell align="center" rowSpan={2}>
                      {item.mcPoin}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {questions
                      ?.filter((q) => q.type === 1)
                      .map((question, questionIndex) => {
                        const answer = item.answers.find(
                          (ans) => ans.questionId === question.id
                        );
                        return (
                          <TableCell key={questionIndex} align="center">
                            {answer ? answer.poin : "-"}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Fragment>
  );
};

export default DetailMc;
