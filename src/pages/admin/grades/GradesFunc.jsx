import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import { useState } from "react";
import GradesConfirm from "./GradesConfirm";
import GradeAdd from "./GradeAdd";

const GradesFunc = () => {
  const [confirm, setConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        gap: 1,
        p: 1,
        boxShadow: 2,
        bgcolor: "white",
        borderRadius: 1,
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

      <GradeAdd open={openAdd} close={() => setOpenAdd(false)} />

      <GradesConfirm open={confirm} close={() => setConfirm(false)} />
    </Box>
  );
};

export default GradesFunc;
