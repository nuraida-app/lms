import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { useDeleteSubjectsMutation } from "../../../state-control/api/subjectApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

const SubjectsConfirm = ({ open, close }) => {
  const [deleteSubjects, { data, isLoading, isSuccess, error, reset }] =
    useDeleteSubjectsMutation();

  const deleteAll = () => deleteSubjects();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      close();
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, data, error]);
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
            Are you sure you want to delete all subjects?
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
            <Button variant="outlined" color="error" onClick={deleteAll}>
              {isLoading ? <CircularProgress size={15} /> : "sure"}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SubjectsConfirm;
