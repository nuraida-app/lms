import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PageName from "../../../PageName";
import Layout from "../../component/layout/Layout";
import Editor from "./Editor";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetQuestionQuery,
  useUpdateQuestionMutation,
} from "../../../../state-control/api/questionApi";
import { toast } from "react-toastify";
import ReactAudioPlayer from "react-audio-player";
import CustomEditor from "./CustomEditor";

const QuestionEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const inputRef = useRef(null);
  const { questionId, quizname, quizId } = params;

  const { data, isLoading: isDataLoading } = useGetQuestionQuery(questionId, {
    skip: !questionId,
  });
  const [
    updateQuestion,
    { data: message, isLoading: isUpdateLoading, isSuccess, error, reset },
  ] = useUpdateQuestionMutation();

  const [type, setType] = useState(1);
  const [value, setValue] = useState("");
  const [choices, setChoices] = useState({
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    choiceE: "",
  });
  const [score, setScore] = useState("");
  const [key, setKey] = useState("");
  const [audio, setAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");

  const handleChoiceChange = (choice) => (content) => {
    setChoices((prevChoices) => ({
      ...prevChoices,
      [choice]: content,
    }));
  };

  const clickAudio = () => inputRef.current.click();

  const handleAudio = (e) => {
    const file = e.target.files[0];
    setAudio(file);
    setAudioUrl(URL.createObjectURL(file));
  };

  const updateHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", type);
    formData.append("quiz_id", quizId);
    formData.append("question", value);
    formData.append("a", choices.choiceA || "");
    formData.append("b", choices.choiceB || "");
    formData.append("c", choices.choiceC || "");
    formData.append("d", choices.choiceD || "");
    formData.append("e", choices.choiceE || "");
    formData.append("key", key || "");
    formData.append("score", score || 0);

    if (audio) {
      formData.append("audio", audio);
    }

    updateQuestion({ id: questionId, body: formData, quizId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      // Reset form fields
      setType(1);
      setValue("");
      setChoices({
        choiceA: "",
        choiceB: "",
        choiceC: "",
        choiceD: "",
        choiceE: "",
      });
      setScore("");
      setKey("");
      setAudio(null);
      setAudioUrl("");
      reset();
      navigate(`/admin/quizzes/${quizname}/${quizId}`);
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [message, isSuccess, error, reset, navigate, quizId, quizname]);

  useEffect(() => {
    if (data) {
      setType(data.type);
      setValue(data.question);
      setAudioUrl(data.audio);
      setChoices({
        choiceA: data.a,
        choiceB: data.b,
        choiceC: data.c,
        choiceD: data.d,
        choiceE: data.e,
      });
      setScore(data.score);
      setKey(data.key);
    }
  }, [data]);

  return (
    <Layout>
      <PageName title={"Edit Question"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <form className="form-question" onSubmit={updateHandler}>
          <FormControl
            fullWidth
            sx={{ bgcolor: "white", boxShadow: 2, borderRadius: 1 }}
          >
            <InputLabel>--Quiz Type--</InputLabel>
            <Select
              label="--Quiz Type--"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={1}>Multiple Choice</MenuItem>
              <MenuItem value={2}>Essay</MenuItem>
            </Select>
          </FormControl>

          {/* <Editor
            placeholder="Write your question here"
            value={value}
            onChange={(html) => setValue(html)}
          /> */}

          <CustomEditor
            placeholder="Write your question here"
            value={value}
            onChange={(html) => setValue(html)}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: audioUrl ? "space-between" : "end",
            }}
          >
            {audioUrl && <ReactAudioPlayer src={audioUrl} controls />}

            <Button variant="contained" color="success" onClick={clickAudio}>
              audio
            </Button>

            <input
              ref={inputRef}
              onChange={handleAudio}
              type="file"
              accept="audio/*"
              style={{ display: "none" }}
            />
          </Box>

          {type === 1 &&
            Object.keys(choices).map((choice, index) => (
              // <Editor
              //   key={index}
              //   placeholder={`Choice ${choice.charAt(choice.length - 1)}`}
              //   value={choices[choice]}
              //   onChange={handleChoiceChange(choice)}
              // />

              <CustomEditor
                key={index}
                placeholder={`Choice ${choice.charAt(choice.length - 1)}`}
                value={choices[choice]}
                onChange={handleChoiceChange(choice)}
              />
            ))}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              bgcolor: "white",
              borderRadius: 1,
              boxShadow: 2,
              justifyContent: type === 1 ? "space-between" : "end",
            }}
          >
            {type === 1 && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl
                  sx={{
                    bgcolor: "white",
                    boxShadow: 2,
                    borderRadius: 1,
                    width: 300,
                  }}
                >
                  <InputLabel>--Correct Answer--</InputLabel>
                  <Select
                    label="--Correct Answer--"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                  >
                    <MenuItem value={"A"}>A</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                    <MenuItem value={"C"}>C</MenuItem>
                    <MenuItem value={"D"}>D</MenuItem>
                    <MenuItem value={"E"}>E</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  sx={{ ml: 2 }}
                  required
                  label="Score"
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                />
              </Box>
            )}

            <Button variant="contained" color="success" type="submit">
              {isDataLoading || isUpdateLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Update"
              )}
            </Button>
          </Box>
        </form>
      </Grid>
    </Layout>
  );
};

export default QuestionEdit;
