import { Box, Button, Input } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import React, { Fragment, useState } from "react";
import StudentAdd from "./StudentAdd";
import StudentsUpload from "./StudentUpload";

const ClassStudentFunc = () => {
  const [confirm, setConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [upload, setUpload] = useState(false);

  const download = () => {
    window, open("/siswa_kelas_templete.xlsx", "_blank");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "start", md: "end" },
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      <Button
        variant="contained"
        color="success"
        startIcon={<AddCircleIcon />}
        onClick={() => setOpenAdd(true)}
        sx={{ width: 120 }}
      >
        Tambah
      </Button>

      <Button
        startIcon={<UploadFileIcon />}
        variant="contained"
        color="secondary"
        onClick={() => setUpload(true)}
        sx={{ width: 120 }}
      >
        Unggah
      </Button>

      <Button
        startIcon={<InsertDriveFileOutlinedIcon />}
        variant="contained"
        color="warning"
        sx={{ width: 120 }}
        onClick={download}
      >
        Template
      </Button>

      <Button
        startIcon={<FolderDeleteIcon />}
        variant="contained"
        color="error"
        onClick={() => setConfirm(true)}
        sx={{ width: 120 }}
      >
        Hapus
      </Button>

      <StudentAdd open={openAdd} close={() => setOpenAdd(false)} />
      <StudentsUpload open={upload} close={() => setUpload(false)} />
    </Box>
  );
};

export default ClassStudentFunc;
