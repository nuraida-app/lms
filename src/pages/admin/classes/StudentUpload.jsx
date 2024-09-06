import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Input,
  Modal,
} from "@mui/material";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUploadToClassMutation } from "../../../state-control/api/studentApi";
import { useParams } from "react-router-dom";

const StudentsUpload = ({ open, close }) => {
  const params = useParams();
  const gradeId = params.gradeId;
  const code = params.code;

  const [uploadStudents, { data, isSuccess, error, isLoading }] =
    useUploadToClassMutation();

  const [file, setFile] = useState(null);

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

        uploadStudents({ gradeId, code, body: result });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setFile(null);
      close();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, data, error]);

  return (
    <Modal open={open} onClose={close} closeAfterTransition>
      <Fade in={open}>
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
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
                gap: 2,
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Button variant="outlined" color="error" onClick={close}>
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

export default StudentsUpload;
