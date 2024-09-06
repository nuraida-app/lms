import { Box, Button, Paper } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import { useState } from "react";
import ScheduleAdd from "./ScheduleAdd";

const ScheduleFunc = () => {
  const [confirm, setConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
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

      <ScheduleAdd open={openAdd} close={() => setOpenAdd(false)} />
    </Box>
  );
};

export default ScheduleFunc;
