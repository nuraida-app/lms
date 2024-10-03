import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Button, ButtonGroup, Grid, Paper } from "@mui/material";
import Media from "./Media";
import { useGetDemographicQuery } from "../../../state-control/api/dbApi";
import Data from "./Data";
import Targted from "./Targted";

const CenterStatistic = () => {
  const [activeTab, setActiveTab] = useState("Province");
  const { data } = useGetDemographicQuery();

  const tabs = [
    { name: "Province", component: <Data type={data?.provinces} /> },
    { name: "City", component: <Data type={data?.regencies} /> },
    { name: "District", component: <Data type={data?.districts} /> },
    { name: "Village", component: <Data type={data?.villages} /> },
    { name: "Targeted", component: <Targted /> },
  ];

  const currentTab = tabs.find((tab) => tab.name === activeTab)?.component;

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} md={8} sx={{ px: 1 }}>
          <Paper
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <ButtonGroup>
              {tabs?.map((item) => (
                <Button
                  variant={activeTab === item.name ? "contained" : "outlined"}
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                >
                  {item.name}
                </Button>
              ))}
            </ButtonGroup>

            {currentTab}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} sx={{ px: 1 }}>
          <Media />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CenterStatistic;
