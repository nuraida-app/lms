import {
  Box,
  CircularProgress,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Fragment, useEffect, useState } from "react";
import SubjectsFunc from "./SubjectsFunc";
import {
  useDeleteSubjectMutation,
  useGetSubjectMutation,
} from "../../../state-control/api/subjectApi";
import { toast } from "react-toastify";
import SubjectEdit from "./SubjectEdit";

const columns = [
  { label: "No", minWidth: 30 },
  { label: "Kode", minWidth: 50 },
  { label: "Satuan", minWidth: 50 },
  { label: "Nama", minWidth: 100 },
  { label: "Aksi", minWidth: 50 },
];

const SubjectsTable = ({ subjects }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubjectId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedSubjectId(null);
  };

  const [edit, setEdit] = useState(false);

  const [deleteSubject, { data, isLoading, isSuccess, error }] =
    useDeleteSubjectMutation();
  const [getSubject, { data: subject, isLoading: subLoading }] =
    useGetSubjectMutation();

  const deleteHandler = () => {
    if (selectedSubjectId) {
      deleteSubject(selectedSubjectId);
      handleClose();
    }
  };

  const detailHandler = () => {
    if (selectedSubjectId) {
      getSubject(selectedSubjectId);
      setEdit(true);
      handleClose();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, data, error]);

  // search function
  const [searchTerm, setSearchTerm] = useState("");
  const filtering = (subject) => {
    return subject.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filtered = subjects?.filter(filtering);

  const serachFunction = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Fragment>
      <Box
        sx={{
          p: 1,
          mb: 1,
          boxShadow: 2,
          bgcolor: "white",
          borderRadius: 1,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column-reverse", md: "row" },
          gap: 2,
        }}
      >
        <Input
          placeholder="Cari Mapel"
          value={searchTerm}
          onChange={serachFunction}
        />

        <SubjectsFunc />
      </Box>
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer
          sx={{ height: { xs: 500, md: 532, xl: 630 }, overflow: "auto" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((item, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ width: item.minWidth }}
                  >
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered?.map((subject, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{subject.code}</TableCell>
                  <TableCell align="center">{subject.homebase}</TableCell>
                  <TableCell align="left">{subject.name}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => handleClick(event, subject.id)}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} />
                      ) : (
                        <MoreHorizIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={detailHandler}>Edit</MenuItem>
        <MenuItem onClick={deleteHandler}>Hapus</MenuItem>
      </Menu>
      <SubjectEdit
        open={edit}
        close={() => setEdit(false)}
        data={subject}
        loading={subLoading}
      />
    </Fragment>
  );
};

export default SubjectsTable;
