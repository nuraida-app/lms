import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import iziToast from "izitoast";
import React, { Fragment, useState } from "react";
import StudentAdd from "./StudentAdd";
import StudentsUpload from "./StudentsUpload";
import StudentsConfirm from "./StudentsConfirm";

const StudentFunc = () => {
  const [confirm, setConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [upload, setUpload] = useState(false);

  const download = () => {
    window, open("/siswa_template.xlsx", "_blank");
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
        add
      </Button>

      <Button
        startIcon={<UploadFileIcon />}
        variant="contained"
        color="secondary"
        onClick={() => setUpload(true)}
        sx={{ width: 120 }}
      >
        Upload
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
        Delete
      </Button>

      <StudentAdd open={openAdd} close={() => setOpenAdd(false)} />

      <StudentsUpload open={upload} close={() => setUpload(false)} />

      <StudentsConfirm open={confirm} close={() => setConfirm(false)} />
    </Box>
  );
};

export default StudentFunc;
