import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Input,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import "./styles.css";
import { useEffect, useState } from "react";
import { useAddHomebaseMutation } from "../../../state-control/api/homebaseApi";
import { toast } from "react-toastify";

const HomebaseFunc = () => {
  const [open, setOpen] = useState(false);
  const [homebase, setHomebase] = useState("");

  const [addHomebase, { data, isSuccess, isLoading, error, reset }] =
    useAddHomebaseMutation();

  const addHandler = (e) => {
    e.preventDefault();

    const data = { homebase };
    addHomebase(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setHomebase("");
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "end",
        gap: 2,
        flexDirection: { xs: "column", md: "row" },
        p: 1,
      }}
    >
      <form className="form-add" onSubmit={addHandler}>
        <Input
          placeholder="Add Homebase"
          value={homebase || ""}
          onChange={(e) => setHomebase(e.target.value)}
        />

        <Button
          variant="contained"
          color="success"
          startIcon={isLoading ? <CircularProgress /> : <AddCircleIcon />}
          type="submit"
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
    </Paper>
  );
};

export default HomebaseFunc;
