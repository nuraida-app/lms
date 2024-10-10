import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Fade,
  Grow,
  IconButton,
  ListItemText,
  Modal,
  TextField,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SaveIcon from "@mui/icons-material/Save";
import {
  useDeleteTopicMutation,
  useGetFilesQuery,
  useUploadFileMutation,
} from "../../../state-control/api/lmsApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Files from "./Files";

const Topics = ({ data, number }) => {
  const params = useParams();
  const code = params.code;

  const { data: files } = useGetFilesQuery(data.id, { skip: !data.id });

  const [deleteTopic, { data: msg, isSuccess, isLoading, error, reset }] =
    useDeleteTopicMutation();
  const [
    uploadFile,
    {
      data: upMsg,
      isSuccess: upSuccess,
      isLoading: upLoading,
      error: upError,
      reset: upReset,
    },
  ] = useUploadFileMutation();

  const [open, setOpen] = useState(false);
  const [urlOpen, setUrlOpen] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handlePdf = (event) => {
    const file = event.target.files[0];

    setFile(file);
    setType("pdf");
  };

  const handleDoc = (event) => {
    const file = event.target.files[0];

    setFile(file);
    setType("doc");
  };

  const uploadHandler = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("title", title);
    formData.append("subject_code", code);
    formData.append("topic_id", data.id);
    formData.append("url", url);

    uploadFile(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [msg, isSuccess, error]);

  useEffect(() => {
    if (upSuccess) {
      toast.success(upMsg.message);
      upReset();
      setTitle("");
      setUrl("");
      setFile(null);
      setFileOpen(false);
      setUrlOpen(false);
    }

    if (upError) {
      toast.error(upError.data.message);
      upReset();
    }
  }, [upMsg, upSuccess, upError]);

  return (
    <Box sx={{ my: 1, mx: 8, borderRadius: 1, p: 1, boxShadow: 4 }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar>{number}</Avatar>
        <ListItemText
          sx={{ width: "70%" }}
          primary={data.title}
          secondary={data.goal}
        />
        <div>
          <IconButton color="warning">
            <EditOutlinedIcon />
          </IconButton>

          <IconButton color="error" onClick={() => deleteTopic(data.id)}>
            {isLoading ? <CircularProgress size={24} /> : <CloseOutlinedIcon />}
          </IconButton>
        </div>
      </Box>
      <Box sx={{ mx: 6, mt: 1, display: "flex", gap: 2 }}>
        <Button
          startIcon={<AddOutlinedIcon />}
          size="small"
          variant="outlined"
          color="success"
          onClick={() => setOpen(!open)}
        >
          Add File
        </Button>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            width: "50%",
          }}
        >
          <Grow in={open}>
            <Button
              size="small"
              variant="contained"
              color="error"
              startIcon={<PictureAsPdfOutlinedIcon />}
              onClick={() => setFileOpen(true)}
            >
              Pdf / doc
            </Button>
          </Grow>

          <Grow in={open}>
            <Button
              size="small"
              variant="contained"
              color="warning"
              startIcon={<InsertLinkOutlinedIcon />}
              onClick={() => setUrlOpen(true)}
            >
              url
            </Button>
          </Grow>
        </Box>
      </Box>

      {/* FILES */}
      {files && files?.map((file) => <Files key={file.id} file={file} />)}

      {/* FILE */}
      <Modal
        open={fileOpen}
        onClose={() => setFileOpen(false)}
        closeAfterTransition
      >
        <Fade in={fileOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 350, md: 400 },
              bgcolor: "#ffff",
              boxShadow: 24,
              p: 2,
              borderRadius: "5px",
            }}
          >
            <TextField
              label="Title"
              placeholder="Please give title for file"
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              sx={{ mb: 1 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Button
              size="small"
              variant="contained"
              color="error"
              startIcon={<PictureAsPdfOutlinedIcon />}
              component="label"
              sx={{ mr: 1 }}
            >
              Pdf
              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={(e) => handlePdf(e)}
              />
            </Button>

            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<ArticleOutlinedIcon />}
              component="label"
            >
              doc
              <input
                type="file"
                hidden
                accept=".doc,.docx"
                onChange={(e) => handleDoc(e)}
              />
            </Button>

            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                startIcon={<SaveIcon />}
                onClick={uploadHandler}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* URL */}
      <Modal
        open={urlOpen}
        onClose={() => setUrlOpen(false)}
        closeAfterTransition
      >
        <Fade in={urlOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 350, md: 400 },
              bgcolor: "#ffff",
              boxShadow: 24,
              p: 2,
              borderRadius: "5px",
            }}
          >
            <TextField
              label="Title"
              placeholder="Plese give title"
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="YouTube's Url"
              placeholder="Paste YouTube's URL"
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                startIcon={<SaveIcon />}
                onClick={uploadHandler}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Topics;
