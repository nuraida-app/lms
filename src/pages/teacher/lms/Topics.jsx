import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grow,
  IconButton,
  ListItemText,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import { useDeleteTopicMutation } from "../../../state-control/api/lmsApi";
import { toast } from "react-toastify";

const Topics = ({ data, number }) => {
  const [deleteTopic, { data: msg, isSuccess, isLoading, error, reset }] =
    useDeleteTopicMutation();

  const [open, setOpen] = useState(false);

  const handlePdf = (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

  const handleDoc = (event) => {
    const file = event.target.files[0];
    console.log(file);
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
              component="label"
            >
              pdf
              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={(e) => handlePdf(e, setPdfFileName)}
              />
            </Button>
          </Grow>

          <Grow in={open}>
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
                onChange={(e) => handleDoc(e, setDocFileName)}
              />
            </Button>
          </Grow>

          <Grow in={open}>
            <Button
              size="small"
              variant="contained"
              color="warning"
              startIcon={<InsertLinkOutlinedIcon />}
            >
              url
            </Button>
          </Grow>
        </Box>
      </Box>
    </Box>
  );
};

export default Topics;
