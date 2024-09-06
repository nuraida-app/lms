import { Box, Grid } from "@mui/material";
import Layout from "../components/layout/Layout";
import PageName from "../../PageName";
import QuizTable from "./QuizTable";

const TeacherQuizPage = () => {
  return (
    <Layout>
      <PageName title={"Quizzes"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <QuizTable />
      </Grid>
    </Layout>
  );
};

export default TeacherQuizPage;
