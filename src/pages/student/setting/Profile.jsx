import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import "./styles.css";

const Profile = () => {
  return (
    <div className="profile">
      <Box sx={{ position: "relative", mb: 2 }}>
        <Avatar
          sx={{
            height: { xs: 80, md: 100 },
            width: { xs: 80, md: 100 },
          }}
        />
        <IconButton
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            color: "inherit",
          }}
        >
          <CameraAltOutlinedIcon />
        </IconButton>
      </Box>

      <Typography variant="h6" fontWeight="bold">
        Student Name
      </Typography>

      <Typography variant="subtitle1" color="textSecondary">
        {"Grade 10 Class 10 1"}
      </Typography>
    </div>
  );
};

export default Profile;
