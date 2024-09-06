import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
} from "../../../../state-control/api/questionApi";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { toast } from "react-toastify";
import ReactAudioPlayer from "react-audio-player";

const createMarkup = (html) => {
  return { __html: html };
};

const QuestionsList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { quizId, quizname } = params;

  const [
    deleteQuestion,
    { data: message, isSuccess, isLoading, error, reset },
  ] = useDeleteQuestionMutation();

  const { data } = useGetQuestionsQuery(quizId, { skip: !quizId });

  const mc = data?.filter((item) => item.type === 1);
  const essay = data?.filter((item) => item.type === 2);

  const editHandler = (id) => {
    navigate(`/admin/quizzes/edit/${quizname}/${quizId}/question/${id}`);
  };

  const deleteHandler = (id) => deleteQuestion({ id, quizId });

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [message, isSuccess, error]);

  return (
    <Grid
      container
      sx={{
        bgcolor: "white",
        borderRadius: 1,
        boxShadow: 2,
        minHeight: { xs: 500, md: 530, xl: 630 },
        p: 1,
      }}
    >
      <Grid item xs={12} md={12}>
        <Typography variant="body2" fontWeight="bold">
          {`Multiple Choises ${mc?.length}`}
        </Typography>

        {mc?.map((item, index) => (
          <Fragment key={item.id}>
            <div className="quiz-layout">
              <div className="number">{index + 1}.</div>

              <div className="quiz-box">
                <article
                  dangerouslySetInnerHTML={createMarkup(item.question)}
                />
                {item.audio && <ReactAudioPlayer src={item.audio} controls />}

                <div className="choices">
                  {item.choices?.map(
                    (choice, index) =>
                      choice.text !== null && (
                        <div className="answer" key={index}>
                          <p
                            className={
                              choice.value === item.key
                                ? "bold-text"
                                : "normal-text"
                            }
                          >
                            {choice.value}.
                          </p>
                          <p
                            dangerouslySetInnerHTML={createMarkup(choice.text)}
                            className={
                              choice.value === item.key
                                ? "bold-text"
                                : "normal-text"
                            }
                          />
                        </div>
                      )
                  )}
                </div>

                <p>{`Key: ${item.key}`}</p>
                <p>{`Score: ${item.score}`}</p>
              </div>
              <div className="action">
                <Tooltip title="Edit">
                  <IconButton onClick={() => editHandler(item.id)}>
                    <EditNoteIcon sx={{ color: orange[800] }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => deleteHandler(item.id)}
                    color="error"
                  >
                    {isLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <PlaylistRemoveIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <Divider />
          </Fragment>
        ))}
      </Grid>
      <Grid item xs={12} md={12} sx={{ pt: 1 }}>
        <Typography variant="body2" fontWeight="bold">
          {`Multiple Essay ${essay?.length}`}
        </Typography>

        {essay?.map((item, index) => (
          <div className="quiz-layout" key={index}>
            <div className="number">{mc?.length + index + 1}</div>

            <div className="quiz-box">
              <article dangerouslySetInnerHTML={createMarkup(item.question)} />
            </div>
            <div className="action">
              <Tooltip title="Edit">
                <IconButton onClick={() => editHandler(item.id)}>
                  <EditNoteIcon sx={{ color: orange[800] }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  onClick={() => deleteHandler(item.id)}
                  color="error"
                >
                  {isLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <PlaylistRemoveIcon />
                  )}
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default QuestionsList;
