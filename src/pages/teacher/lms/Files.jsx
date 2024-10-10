import React, { useEffect } from "react";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useDeleteFileMutation } from "../../../state-control/api/lmsApi";
import { toast } from "react-toastify";

const Files = ({ file }) => {
  const [deleteFile, { data, isSuccess, isLoading, error, reset }] =
    useDeleteFileMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);
  return (
    <Box
      sx={{
        p: 1,
        mx: 8,
        borderRadius: 1,
        boxShadow: 4,
        my: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        size="small"
        startIcon={
          file.type_file === "pdf" ? (
            <PictureAsPdfOutlinedIcon />
          ) : file.type_file === "doc" ? (
            <ArticleOutlinedIcon />
          ) : (
            <YouTubeIcon />
          )
        }
        variant="contained"
        color={
          file.type_file === "pdf"
            ? "warning"
            : file.type_file === "doc"
            ? "primary"
            : "error"
        }
      >
        {file.title}
      </Button>

      <IconButton color="error" onClick={() => deleteFile(file.id)}>
        {isLoading ? <CircularProgress size={24} /> : <CloseOutlinedIcon />}
      </IconButton>
    </Box>
  );
};

export default Files;
