import { Grid } from "@mui/material";
import PageName from "../../PageName";
import Layout from "../component/layout/Layout";
import ClassesFunc from "./ClassesFunc";
import ClassTable from "./ClassTable";

const ClassesPage = () => {
  return (
    <Layout>
      <PageName title={"Classes"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Grid item xs={12} md={12}>
          <ClassesFunc />
        </Grid>

        <Grid item xs={12} md={12}>
          <ClassTable />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ClassesPage;
