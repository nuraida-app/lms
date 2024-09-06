import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";
import Layout from "../components/layout/Layout";
import PageName from "../../PageName";
import Announcements from "./Announcements";
import { useGetSchedulesQuery } from "../../../state-control/api/scheduleApi";
import Schedule from "./Schedule";

const TeacherDashboard = () => {
  const { data } = useGetSchedulesQuery();

  return (
    <Layout>
      <PageName title={"Dashboard"} />
      <Grid container sx={{ minHeight: "85vh" }}>
        <Grid item xs={12} md={9} sx={{ p: 1 }}>
          <Announcements />
        </Grid>
        <Grid item xs={12} md={3} sx={{ p: 1 }}>
          {data?.map((item, index) => (
            <Schedule key={index} data={item} />
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default TeacherDashboard;
