import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import iziToast from "izitoast";
import { useEffect, useState } from "react";
import TeacherAdd from "./TeacherAdd";
import TeachersConfirm from "./TeachersConfirm";
import TeachersUpload from "./TeachersUpload";

const TeachersFunc = () => {
  const [confirm, setConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [upload, setUpload] = useState(false);

  const download = () => {
    window, open("/guru_template.xlsx", "_blank");
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
        onClick={download}
        sx={{ width: 120 }}
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

      <TeacherAdd open={openAdd} close={() => setOpenAdd(false)} />

      <TeachersUpload open={upload} close={() => setUpload(false)} />

      <TeachersConfirm open={confirm} close={() => setConfirm(false)} />
    </Box>
  );
};

export default TeachersFunc;
