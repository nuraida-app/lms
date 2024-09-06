import { Backdrop, Box, Button, Fade, Modal, TextField } from "@mui/material";

const ScheduleDetail = ({ open, close, start, end }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-EN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(date);
    } catch (error) {
      console.error("Invalid date string:", dateString);
      return "Invalid date";
    }
  };

  return (
    <Modal open={open} onClose={close} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { md: 400, xl: 600 },
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {start && (
            <TextField fullWidth label="Mulai" value={formatDate(start)} />
          )}

          {end && (
            <TextField fullWidth label="Selesai" value={formatDate(end)} />
          )}

          <Button variant="contained" color="error" onClick={close}>
            Tutup
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};
export default ScheduleDetail;
