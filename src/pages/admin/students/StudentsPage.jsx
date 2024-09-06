import { Box, Grid } from "@mui/material";
import Layout from "../component/layout/Layout";
import PageName from "../../PageName";
import StudentsTable from "./StudentsTable";
import {
  useGetStudentByHomebaseQuery,
  useGetStudentsQuery,
} from "../../../state-control/api/studentApi";

const StudentsPage = () => {
  const { data, isLoading } = useGetStudentByHomebaseQuery();

  return (
    <Layout>
      <PageName title={"Students"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <StudentsTable students={data} loading={isLoading} />
      </Grid>
    </Layout>
  );
};

export default StudentsPage;
