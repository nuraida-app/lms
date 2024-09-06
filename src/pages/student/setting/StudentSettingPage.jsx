import { Box, Grid, Paper, useTheme, useMediaQuery } from "@mui/material";
import PageName from "../../PageName";
import Layout from "../components/layout/Layout";
import Profile from "./Profile";
import { useState } from "react";
import Identity from "./Identity";
import Parents from "./Parents";
import Address from "./Address";
import Contact from "./Contact";

const items = ["Identity", "Parents", "Address", "Contact"];

const StudentSettingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState("Identity");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleMouseEnter = (index, item) => {
    setActiveIndex(index);
    setSelectedComponent(item);
  };

  return (
    <Layout>
      <PageName title={"Setting"} />
      <Grid container sx={{ height: "85vh" }}>
        <Box sx={{ width: "100%", position: "relative" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#FB7D5B"
              fillOpacity="1"
              d="M0,288L0,96L41.1,96L41.1,256L82.3,256L82.3,256L123.4,256L123.4,96L164.6,96L164.6,224L205.7,224L205.7,128L246.9,128L246.9,224L288,224L288,32L329.1,32L329.1,160L370.3,160L370.3,160L411.4,160L411.4,0L452.6,0L452.6,128L493.7,128L493.7,96L534.9,96L534.9,160L576,160L576,0L617.1,0L617.1,320L658.3,320L658.3,64L699.4,64L699.4,224L740.6,224L740.6,320L781.7,320L781.7,96L822.9,96L822.9,224L864,224L864,32L905.1,32L905.1,224L946.3,224L946.3,32L987.4,32L987.4,320L1028.6,320L1028.6,256L1069.7,256L1069.7,160L1110.9,160L1110.9,128L1152,128L1152,224L1193.1,224L1193.1,288L1234.3,288L1234.3,64L1275.4,64L1275.4,224L1316.6,224L1316.6,128L1357.7,128L1357.7,224L1398.9,224L1398.9,64L1440,64L1440,0L1398.9,0L1398.9,0L1357.7,0L1357.7,0L1316.6,0L1316.6,0L1275.4,0L1275.4,0L1234.3,0L1234.3,0L1193.1,0L1193.1,0L1152,0L1152,0L1110.9,0L1110.9,0L1069.7,0L1069.7,0L1028.6,0L1028.6,0L987.4,0L987.4,0L946.3,0L946.3,0L905.1,0L905.1,0L864,0L864,0L822.9,0L822.9,0L781.7,0L781.7,0L740.6,0L740.6,0L699.4,0L699.4,0L658.3,0L658.3,0L617.1,0L617.1,0L576,0L576,0L534.9,0L534.9,0L493.7,0L493.7,0L452.6,0L452.6,0L411.4,0L411.4,0L370.3,0L370.3,0L329.1,0L329.1,0L288,0L288,0L246.9,0L246.9,0L205.7,0L205.7,0L164.6,0L164.6,0L123.4,0L123.4,0L82.3,0L82.3,0L41.1,0L41.1,0L0,0L0,0Z"
            ></path>
          </svg>

          <Grid
            container
            sx={{
              position: "absolute",
              top: 0,
              height: "80vh",
            }}
          >
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: isSmallScreen ? 2 : 0,
              }}
            >
              <Profile />
            </Grid>

            <Grid
              item
              xs={12}
              md={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: isSmallScreen ? "center" : "start",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", md: "80%" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    position: "relative",
                    bgcolor: "white",
                  }}
                >
                  <Box
                    position="absolute"
                    height="40px"
                    bgcolor="#4D44B5"
                    sx={{
                      width: { xs: "25%", md: "165px", xl: "189px" },
                      left: `${activeIndex * 25}%`,
                      transition: "left 0.5s",
                    }}
                  />
                  {items.map((item, index) => (
                    <Box
                      key={item}
                      textAlign="center"
                      sx={{
                        p: 1,
                        width: "25%",
                        zIndex: 1,
                        color: activeIndex === index ? "white" : "black",
                        cursor: "pointer",
                      }}
                      onClick={() => handleMouseEnter(index, item)}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
                {selectedComponent === "Identity" && <Identity />}
                {selectedComponent === "Parents" && <Parents />}
                {selectedComponent === "Address" && <Address />}
                {selectedComponent === "Contact" && <Contact />}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Layout>
  );
};

export default StudentSettingPage;
