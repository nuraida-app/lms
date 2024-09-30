import Layout from "../components/layout/Layout";
import PageName from "../../PageName";
import { Box, Grid, Input, Paper } from "@mui/material";
import SubjectsTable from "./SubjectTable";

const StudentSubjectPage = () => {
  return (
    <Layout>
      <PageName title={"Subjects"} />
      <Box
        sx={{
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Grid item xs={12} md={12}>
          <Paper sx={{ p: 1 }}>
            <Input placeholder="Search Subject" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12}>
          <SubjectsTable />
        </Grid>
      </Box>
    </Layout>
  );
};

export default StudentSubjectPage;