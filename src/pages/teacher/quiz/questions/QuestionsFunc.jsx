import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Confirm from "./Confirm";
import Upload from "./Upload";

const QuestionsFunc = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [confirm, setConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [upload, setUpload] = useState(false);

  const download = () => {
    window.open("/soal_template.xlsx", "_blank");
  };

  const addPage = () =>
    navigate(`/teacher/quizzes/add/${params.quizname}/${params.quizId}`);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "start", md: "end" },
        gap: 1,
        flexWrap: "wrap",
        bgcolor: "white",
        p: 1,
        borderRadius: 1,
        boxShadow: 2,
      }}
    >
      <Button
        variant="contained"
        color="success"
        startIcon={<AddCircleIcon />}
        onClick={addPage}
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

      <Confirm open={confirm} close={() => setConfirm(false)} />
      <Upload open={upload} close={() => setUpload(false)} />
    </Box>
  );
};

export default QuestionsFunc;
