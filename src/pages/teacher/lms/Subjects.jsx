import React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

const Subjects = ({ data }) => {
  const navigate = useNavigate();

  const toPage = (code, name) => {
    const formatName = name.replace(/\s+/g, "-");

    navigate(`/teacher/subjects/${code}/${formatName}`);
  };
  return (
    <Paper sx={{ p: 1, width: "25%" }}>
      <ListItemButton onClick={() => toPage(data?.code, data?.name)}>
        <ListItemIcon>
          <FolderOpenOutlinedIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary={data.name} />
      </ListItemButton>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Bab</TableCell>
            <TableCell align="center">:</TableCell>
            <TableCell align="center">{data.chapter_count}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Topik</TableCell>
            <TableCell align="center">:</TableCell>
            <TableCell align="center">{data.topic_count}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Subjects;
