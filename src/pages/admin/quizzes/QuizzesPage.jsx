import { Box, Grid } from "@mui/material";
import Layout from "../component/layout/Layout";
import PageName from "../../PageName";
import QuizzesTable from "./QuizzesTable";

const QuizzesPage = () => {
  return (
    <Layout>
      <PageName title={"Quizzes"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <QuizzesTable />
      </Grid>
    </Layout>
  );
};

export default QuizzesPage;
