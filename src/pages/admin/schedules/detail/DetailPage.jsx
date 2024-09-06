import { Grid } from "@mui/material";
import PageName from "../../../PageName";
import Layout from "../../component/layout/Layout";
import DetailQuiz from "./DetailQuiz";
import DetailFunc from "./DetailFunc";

const DetailPage = () => {
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

export default DetailPage;
