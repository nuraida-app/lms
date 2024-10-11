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
import {
  AddOutlined as AddIcon,
  CloseOutlined as CloseIcon,
  EditOutlined as EditIcon,
  PictureAsPdfOutlined as PdfIcon,
  ArticleOutlined as DocIcon,
  InsertLinkOutlined as LinkIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import {
  useDeleteTopicMutation,
  useGetFilesQuery,
  useUploadFileMutation,
} from "../../../state-control/api/lmsApi";
import { toast } from "react-toastify";
import Files from "./Files";

const Topics = ({ data, number }) => {
  const { code } = useParams();
  const { data: files } = useGetFilesQuery(data.id, { skip: !data.id });
  const [deleteTopic, { isLoading }] = useDeleteTopicMutation();
  const [
    uploadFile,
    {
      isLoading: upLoading,
      isSuccess: upSuccess,
      error: upError,
      reset: upReset,
    },
  ] = useUploadFileMutation();

  const [modalState, setModalState] = useState({
    open: false,
    fileOpen: false,
    urlOpen: false,
  });
  const [formData, setFormData] = useState({
    file: null,
    type: "",
    title: "",
    url: "",
  });

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    setFormData({ ...formData, file, type: fileType });
  };

  const uploadHandler = () => {
    const { file, type, title, url } = formData;
    const payload = new FormData();
    payload.append("file", file);
    payload.append("type", type);
    payload.append("title", title);
    payload.append("subject_code", code);
    payload.append("topic_id", data.id);
    payload.append("url", url);
    uploadFile(payload);
  };

  useEffect(() => {
    if (upSuccess) {
      toast.success("File uploaded successfully");
      upReset();
      setFormData({ file: null, type: "", title: "", url: "" });
      setModalState({ ...modalState, fileOpen: false, urlOpen: false });
    }
    if (upError) toast.error("Error uploading file");
  }, [upSuccess, upError]);

  return (
    <Box sx={{ my: 1, mx: 8, borderRadius: 1, p: 1, boxShadow: 4 }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar>{number}</Avatar>
        <ListItemText
          primary={data.title}
          secondary={data.goal}
          sx={{ width: "70%" }}
        />
        <div>
          <IconButton color="warning">
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => deleteTopic(data.id)}>
            {isLoading ? <CircularProgress size={24} /> : <CloseIcon />}
          </IconButton>
        </div>
      </Box>
      <Box sx={{ mx: 6, mt: 1, display: "flex", gap: 2 }}>
        <Button
          startIcon={<AddIcon />}
          size="small"
          variant="outlined"
          color="success"
          onClick={() =>
            setModalState({ ...modalState, open: !modalState.open })
          }
        >
          Add File
        </Button>
        <Box sx={{ display: "flex", gap: 2, width: "50%" }}>
          <Grow in={modalState.open}>
            <Button
              size="small"
              variant="contained"
              color="error"
              startIcon={<PdfIcon />}
              onClick={() => setModalState({ ...modalState, fileOpen: true })}
            >
              Pdf / doc
            </Button>
          </Grow>
          <Grow in={modalState.open}>
            <Button
              size="small"
              variant="contained"
              color="warning"
              startIcon={<LinkIcon />}
              onClick={() => setModalState({ ...modalState, urlOpen: true })}
            >
              url
            </Button>
          </Grow>
        </Box>
      </Box>

      {files && files.map((file) => <Files key={file.id} file={file} />)}

      <Modal
        open={modalState.fileOpen}
        onClose={() => setModalState({ ...modalState, fileOpen: false })}
        closeAfterTransition
      >
        <Fade in={modalState.fileOpen}>
          <Box sx={modalStyle}>
            <TextField
              label="Title"
              fullWidth
              size="small"
              sx={{ mb: 1 }}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Button
              component="label"
              variant="contained"
              color="error"
              startIcon={<PdfIcon />}
              sx={{ mr: 1 }}
            >
              Pdf
              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "pdf")}
              />
            </Button>
            <Button
              component="label"
              variant="contained"
              color="primary"
              startIcon={<DocIcon />}
            >
              doc
              <input
                type="file"
                hidden
                accept=".doc,.docx"
                onChange={(e) => handleFileChange(e, "doc")}
              />
            </Button>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                startIcon={<SaveIcon />}
                onClick={uploadHandler}
                disabled={upLoading}
              >
                {upLoading ? <CircularProgress size={24} /> : "Save"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={modalState.urlOpen}
        onClose={() => setModalState({ ...modalState, urlOpen: false })}
        closeAfterTransition
      >
        <Fade in={modalState.urlOpen}>
          <Box sx={modalStyle}>
            <TextField
              label="Title"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <TextField
              label="YouTube's Url"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
            />
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                startIcon={<SaveIcon />}
                onClick={uploadHandler}
                disabled={upLoading}
              >
                {upLoading ? <CircularProgress size={24} /> : "Save"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, md: 400 },
  bgcolor: "#fff",
  boxShadow: 24,
  p: 2,
  borderRadius: "5px",
};

export default Topics;
