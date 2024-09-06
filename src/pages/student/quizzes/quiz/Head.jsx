import { Box, Container, Typography } from "@mui/material";

const Head = ({ user, quiz }) => {
  return (
    <Box sx={{ height: 70, bgcolor: "#4D44B5", boxShadow: 4, p: 1 }}>
      <Container
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          color: "#FFFFFF",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight="bold">{user?.name}</Typography>

        <Typography align="right" fontSize={12}>
          {quiz}
        </Typography>
      </Container>
    </Box>
  );
};

export default Head;
