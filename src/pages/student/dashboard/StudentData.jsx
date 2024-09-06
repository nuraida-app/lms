import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CakeIcon from "@mui/icons-material/Cake";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useSelector } from "react-redux";
import "./styles.css";

const StudentData = () => {
  const { user, isAuthLoading } = useSelector((state) => state.authentication);
  return (
    <div className="container">
      <Box
        sx={{
          height: { xs: "20%", md: "30%" },
          bgcolor: "#4D44B5",
          position: "relative",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="shape_1" />
        <div className="shape_2" />
        <Avatar
          sx={{
            position: { xs: "relative", md: "absolute" },
            top: { xs: "unset", md: 60 },
            left: { xs: "unset", md: 40 },
            height: { xs: 80, md: 100 },
            width: { xs: 80, md: 100 },
            border: "5px solid white",
          }}
        />
      </Box>
      <Box
        sx={{
          height: { xs: "80%", md: "70%" },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "70%", lg: "80%" },
            mt: 1,
            p: { xs: 1, md: 0 },
            height: "25%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            position: "absolute",
            right: 0,
          }}
        >
          <Box>
            {isAuthLoading ? (
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            ) : (
              <Typography variant="h5" component="div">
                {user?.name}
              </Typography>
            )}

            <Typography variant="subtitle1" color="textSecondary">
              {`Grade ${user?.grade} Class ${user?.class}`}
            </Typography>
          </Box>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            p: 1,
            height: "70%",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ p: 1, display: "flex", gap: 1, alignItems: "center" }}
            >
              <CakeIcon sx={{ fontSize: 40, color: "#fb7d5b" }} />
              <Box>
                <Typography component="div">Birth Day</Typography>
                <Typography color="textSecondary">16 january 2024</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ p: 1, display: "flex", gap: 1, alignItems: "center" }}
            >
              <MyLocationIcon sx={{ fontSize: 40, color: "#fb7d5b" }} />
              <Box>
                <Typography component="div">Province</Typography>
                <Typography color="textSecondary">Jawa Barat</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ p: 1, display: "flex", gap: 1, alignItems: "center" }}
            >
              <NearMeIcon sx={{ fontSize: 40, color: "#fb7d5b" }} />
              <Box>
                <Typography component="div">Adress</Typography>
                <Typography color="textSecondary">Merdeka</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ p: 1, display: "flex", gap: 1, alignItems: "center" }}
            >
              <MyLocationIcon sx={{ fontSize: 40, color: "#fb7d5b" }} />
              <Box>
                <Typography component="div">City</Typography>
                <Typography color="textSecondary">Bandung</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default StudentData;
