import { Box, Button, Fade, Modal, Skeleton, TextField } from "@mui/material";
import "./styles.css";
import { useEffect, useState } from "react";
import { useUpdateSubjectMutation } from "../../../state-control/api/subjectApi";
import { toast } from "react-toastify";

const SubjectEdit = ({ open, close, data, loading }) => {
  const [updateSubject, { data: message, isSuccess, isLoading, error }] =
    useUpdateSubjectMutation();

  const [code, setCode] = useState("");
  const [subject, setSubject] = useState("");

  const updateHandler = (e) => {
    e.preventDefault();

    const newdata = {
      code,
      subject,
    };

    updateSubject({ id: data?.id, body: newdata });
  };

  useEffect(() => {
    if (data) {
      setCode(data?.code);
      setSubject(data?.name);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message?.message);
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error, message]);
  return (
    <Modal open={open} onClose={close}>
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
          {loading || isLoading ? (
            <Skeleton variant="rounded" width={210} height={60} />
          ) : (
            <form className="form-subject" onSubmit={updateHandler}>
              <TextField
                fullWidth
                label="Code"
                placeholder="Code"
                value={code || ""}
                onChange={(e) => setCode(e.target.value)}
              />

              <TextField
                fullWidth
                label="Subject"
                placeholder="Subject"
                value={subject || ""}
                onChange={(e) => setSubject(e.target.value)}
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <Button variant="outlined" color="error" onClick={close}>
                  cancel
                </Button>
                <Button variant="contained" color="success" type="submit">
                  add
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default SubjectEdit;
