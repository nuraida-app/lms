import { Box, Button, Input, Paper } from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ScoreIcon from "@mui/icons-material/Score";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { Fragment, useState } from "react";
import DetailLog from "./DetailLog";
import DetailMc from "./DetailMc";
import DetailEssay from "./DetailEssay";
import DetailScores from "./DetailScores";
import { useGetStudentsAnswerQuery } from "../../../../state-control/api/answerApi";
import { useParams } from "react-router-dom";
import { useGetQuestionsQuery } from "../../../../state-control/api/questionApi";
import { useGetStudentsByGradeQuery } from "../../../../state-control/api/studentApi";
import { useGetLogsQuery } from "../../../../state-control/api/logApi";

const DetailFunc = () => {
  const [logPage, setLogPage] = useState(true);
  const [mcPage, setMcPage] = useState(false);
  const [essayPage, setEssayPage] = useState(false);
  const [scorePage, setScorePage] = useState(false);

  const toLogPage = () => {
    setLogPage(true);
    setScorePage(false);
    setEssayPage(false);
    setMcPage(false);
  };

  const toMcPage = () => {
    setLogPage(false);
    setMcPage(true);
    setScorePage(false);
    setEssayPage(false);
  };

  const toEssayPage = () => {
    setLogPage(false);
    setMcPage(false);
    setEssayPage(true);
    setScorePage(false);
  };

  const toScorePage = () => {
    setLogPage(false);
    setMcPage(false);
    setEssayPage(false);
    setScorePage(true);
  };

  // DATA FETCHING
  const params = useParams();
  const quizname = params.quizname;
  const quizId = params.quizId;
  const gradeId = params.gradeId;

  const { data: questions, refetch: refetchQuestions } = useGetQuestionsQuery(
    quizId,
    { skip: !quizId }
  );

  const { data: answers, refetch: refetchAnswers } = useGetStudentsAnswerQuery(
    { quizId, gradeId },
    { skip: !quizId && !gradeId }
  );

  const { data: logs, refetch: refetchLogs } = useGetLogsQuery(quizId, {
    skip: !quizId,
  });

  // SEARCH FUNCTIONS
  const [searchTerm, setSearchTerm] = useState("");

  // MC & Essay
  const filtering = (student) => {
    return student.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filtered = answers?.filter(filtering);

  // REFETCH FUNCTION
  const handleRefetch = () => {
    refetchQuestions();
    refetchAnswers();
    refetchLogs();
  };

  return (
    <Fragment>
      <Paper
        sx={{
          p: 1,
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Input
          placeholder="Search Student"
          sx={{ width: 360 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            sx={{ width: 170 }}
            variant="contained"
            color="error"
            startIcon={<CloudSyncIcon />}
            onClick={handleRefetch}
          >
            Prbarui Data
          </Button>
          <Button
            startIcon={<SyncAltIcon />}
            variant="contained"
            color="success"
            onClick={toLogPage}
          >
            Log
          </Button>
          <Button
            startIcon={<AutoGraphIcon />}
            variant="contained"
            color="success"
            onClick={toMcPage}
          >
            pg
          </Button>
          <Button
            startIcon={<ManageSearchIcon />}
            variant="contained"
            color="success"
            onClick={toEssayPage}
          >
            essay
          </Button>
          <Button
            startIcon={<ScoreIcon />}
            variant="contained"
            color="success"
            onClick={toScorePage}
          >
            Nilai
          </Button>
        </Box>
      </Paper>

      {logPage && <DetailLog data={filtered} logs={logs} />}

      {mcPage && (
        <DetailMc data={filtered} questions={questions} quizname={quizname} />
      )}

      {essayPage && <DetailEssay data={filtered} questions={questions} />}

      {scorePage && (
        <DetailScores
          data={filtered}
          quizname={quizname}
          questions={questions}
        />
      )}
    </Fragment>
  );
};

export default DetailFunc;
