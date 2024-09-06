import { Box, Grid } from "@mui/material";
import Layout from "../../component/layout/Layout";
import PageName from "../../../PageName";
import QuestionsFunc from "./QuestionsFunc";
import QuestionsList from "./QuestionsList";

const QuestionsPage = () => {
  return (
    <Layout>
      <PageName title={"Quiz Name"} />
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
          <QuestionsFunc />
        </Grid>

        <Grid item xs={12} md={12}>
          <QuestionsList />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default QuestionsPage;
