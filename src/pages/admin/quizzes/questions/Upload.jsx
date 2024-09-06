import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Input,
  Modal,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { useUploadQuestionsMutation } from "../../../../state-control/api/questionApi";
import { toast } from "react-toastify";

const Upload = ({ open, close }) => {
  const params = useParams();
  const { quizId } = params;
  const [file, setFile] = useState(null);

  const [uploadQuestions, { data, isSuccess, isLoading, error, reset }] =
    useUploadQuestionsMutation();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadData = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          range: 1,
        });

        const result = { data: jsonData };

        uploadQuestions({ id: quizId, body: result });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      close();
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
      console.log(error);
    }
  }, [data, isSuccess, error]);

  return (
    <Modal open={open} onClose={close} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Input
              required
              fullWidth
              type="file"
              placeholder="Upload file here"
              onChange={handleFile}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                gap: 1,
              }}
            >
              <Button variant="contained" color="error" onClick={close}>
                cancel
              </Button>
              <Button variant="contained" color="success" onClick={uploadData}>
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "upload"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Upload;
