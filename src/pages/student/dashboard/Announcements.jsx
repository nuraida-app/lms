import { Box, Divider, Paper, Typography } from "@mui/material";

const createMarkup = (html) => {
  return { __html: html };
};

const Announcements = () => {
  return (
    <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
      <Paper sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          Announcements
        </Typography>
      </Paper>

      <Paper sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography fontWeight="bold" sx={{ fontSize: 16 }}>
          Topic
        </Typography>
        <Divider />

        <Typography>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>

        <Typography align="right" fontSize={10}>
          26 April 2024, 13.00
        </Typography>
      </Paper>

      <Paper sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography fontWeight="bold" sx={{ fontSize: 16 }}>
          Topic
        </Typography>
        <Divider />

        <Typography>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>

        <Typography align="right" fontSize={10}>
          26 April 2024, 13.00
        </Typography>
      </Paper>
    </Box>
  );
};

export default Announcements;
