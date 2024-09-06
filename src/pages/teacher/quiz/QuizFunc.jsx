import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import { useState } from "react";
import QuizAdd from "./QuizAdd";
import QuizConfirm from "./QuizConfirm";

const QuizFunc = () => {
  const [confirm, setConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        gap: 1,
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

      <QuizAdd open={openAdd} close={() => setOpenAdd(false)} />

      <QuizConfirm open={confirm} close={() => setConfirm(false)} />
    </Box>
  );
};

export default QuizFunc;
