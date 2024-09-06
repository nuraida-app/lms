import { Box, Button, Fade, Input, Modal, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import "./styles.css";
import { useState } from "react";

const HomebaseFunc = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        gap: 2,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <form className="form-add">
        <Input placeholder="Add Homebase" />
        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircleIcon />}
        >
          Add
        </Button>
      </form>
      <Button
        variant="contained"
        color="error"
        startIcon={<FolderDeleteIcon />}
        onClick={() => setOpen(true)}
      >
        delete
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 350, md: 400 },
              bgcolor: "#ffff",
              boxShadow: 24,
              p: 2,
              borderRadius: "5px",
            }}
          >
            <Typography>
              Are you sure want to delete all the data related to homebase, this
              actions cannot be restore
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(false)}
              >
                cancel
              </Button>
              <Button variant="outlined" color="error">
                sure
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default HomebaseFunc;
