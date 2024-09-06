import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { useClearDataMutation } from "../../../state-control/api/teacherApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const TeachersConfirm = ({ open, close }) => {
  const [clearData, { data, isSuccess, isLoading, error }] =
    useClearDataMutation();

  const deleteHandler = () => clearData();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      close();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [data, isSuccess, error]);
  return (
    <Modal open={open} onClose={close} closeAfterTransition>
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
          <Typography align="center">
            Are you sure you want to delete all teachers?
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button variant="contained" color="error" onClick={close}>
              cancel
            </Button>
            <Button variant="outlined" color="error" onClick={deleteHandler}>
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "sure"
              )}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TeachersConfirm;
