import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useEffect, useState } from "react";
import TeacherAdd from "./TeacherAdd";
import TeachersConfirm from "./TeachersConfirm";
import TeachersUpload from "./TeachersUpload";

const TeachersFunc = () => {
  const [confirm, setConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

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
        startIcon={<FolderDeleteIcon />}
        variant="contained"
        color="error"
        onClick={() => setConfirm(true)}
        sx={{ width: 120 }}
      >
        Delete
      </Button>

      <TeacherAdd open={openAdd} close={() => setOpenAdd(false)} />

      <TeachersConfirm open={confirm} close={() => setConfirm(false)} />
    </Box>
  );
};

export default TeachersFunc;
