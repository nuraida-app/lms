import { Grid } from "@mui/material";
import PageName from "../../../PageName";
import Layout from "../../components/layout/Layout";
import DetailFunc from "./DetailFunc";

const TeacherDetailPage = () => {
  return (
    <Layout>
      <PageName title={"quiz Name"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* <DetailQuiz /> */}

        <DetailFunc />
      </Grid>
    </Layout>
  );
};

export default TeacherDetailPage;
