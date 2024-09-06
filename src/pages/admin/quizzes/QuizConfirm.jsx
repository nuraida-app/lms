import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { useClearDataMutation } from "../../../state-control/api/quizApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const QuizConfirm = ({ open, close }) => {
  const [clearData, { data, isSuccess, isLoading, error, reset }] =
    useClearDataMutation();

  const remove = () => clearData();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      close();
      reset();
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
            Are you sure you want to delete all quizzes?
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-end",
              mt: 1,
            }}
          >
            <Button variant="contained" color="error" onClick={close}>
              cancel
            </Button>
            <Button variant="outlined" color="error" onClick={remove}>
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

export default QuizConfirm;
