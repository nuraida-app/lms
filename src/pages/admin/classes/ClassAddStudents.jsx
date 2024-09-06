import { Grid } from "@mui/material";
import PageName from "../../PageName";
import Layout from "../component/layout/Layout";
import ClassStudentsTable from "./ClassStudentsTable";

const ClassAddStudents = () => {
  return (
    <Layout>
      <PageName title={"Add Students"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <ClassStudentsTable />
      </Grid>
    </Layout>
  );
};

export default ClassAddStudents;
