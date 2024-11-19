import Layout from "../components/layout/Layout";
import PageName from "../../PageName";
import { Box, Grid, Input, Paper } from "@mui/material";
import QuizTable from "./QuizTable";
import Quiz from "./Quiz";
import { useSelector } from "react-redux";
import { useGetSchedulesByGradeQuery } from "../../../state-control/api/scheduleApi";
import { useGetMyLogsQuery } from "../../../state-control/api/logApi";

const StudentQuizPage = () => {
  const { user } = useSelector((state) => state.authentication);
  const { data } = useGetSchedulesByGradeQuery(user?.grade_id, {
    skip: !user?.grade_id,
  });
  const { data: log } = useGetMyLogsQuery(user?.nis, { skip: !user?.nis });

  return (
    <Layout>
      <PageName title={"Ujian"} />
      <Box
        sx={{
          height: "82vh",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Paper sx={{ p: 1 }}>
          <Input placeholder="Cari Ujian" />
        </Paper>

        {/* <QuizTable /> */}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            maxHeight: 520,
            overflow: "auto",
            alignItems: "start",
            overflowY: "auto",
          }}
        >
          {data?.map((item, index) => (
            <Quiz key={index} data={item} user={user} log={log} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default StudentQuizPage;
