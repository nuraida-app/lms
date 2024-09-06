import { Box, Button, Fade, Modal, Typography } from "@mui/material";

const GradesConfirm = ({ open, close }) => {
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
            Are you sure you want to delete all grades?
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
            <Button variant="outlined" color="error">
              sure
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default GradesConfirm;
