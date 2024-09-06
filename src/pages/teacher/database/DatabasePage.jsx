import { Grid } from "@mui/material";
import Layout from "../components/layout/Layout";
import PageName from "../../PageName";
import { useGetStudentsByClassQuery } from "../../../state-control/api/studentApi";
import { useSelector } from "react-redux";
import DbTable from "./DbTable";
import { useGetDatabaseQuery } from "../../../state-control/api/dbApi";

const DatabasePage = () => {
  const { user } = useSelector((state) => state.authentication);
  const { data } = useGetStudentsByClassQuery(user?.class_code, {
    skip: !user?.class_code,
  });
  const { data: database } = useGetDatabaseQuery();

  return (
    <Layout>
      <PageName title={"Database"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <DbTable students={data} database={database} />
      </Grid>
    </Layout>
  );
};

export default DatabasePage;
