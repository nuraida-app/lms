import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetSubjectsQuery } from "../../../state-control/api/subjectApi";
import { useGetClassesQuery } from "../../../state-control/api/classApi";
import { useAddAssignClassMutation } from "../../../state-control/api/teacherApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Classes = () => {
  const { data: subjects } = useGetSubjectsQuery();
  const { data: classes } = useGetClassesQuery();
  const { user } = useSelector((state) => state.authentication);

  const initialAssigned = user?.subject_classes || {}; // subject -> assigned classes map

  const [selectedClasses, setSelectedClasses] = useState(initialAssigned);

  const [addAssignClass, { data, isSuccess, isLoading, error, reset }] =
    useAddAssignClassMutation();

  const addHandler = (subjectId, classId) => {
    // Get the current assigned classes for the subject
    const updatedSubjectClasses = { ...selectedClasses };
    const currentClasses = updatedSubjectClasses[subjectId] || [];

    // Toggle class selection
    const updatedClasses = currentClasses.includes(classId)
      ? currentClasses.filter((id) => id !== classId)
      : [...currentClasses, classId];

    updatedSubjectClasses[subjectId] = updatedClasses;
    setSelectedClasses(updatedSubjectClasses);

    // Send the updated class assignment to the server
    addAssignClass({ subjectId, classes: updatedClasses });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, data, error]);

  return (
    <Box sx={{ p: 1 }}>
      <Paper sx={{ p: 1, mb: 2 }}>
        <Typography fontWeight="bold">Choose Teaching Class</Typography>
      </Paper>

      {isLoading ? (
        <Box align="center">
          <CircularProgress />
        </Box>
      ) : (
        subjects?.map((subject, index) => (
          <Paper key={index} sx={{ p: 1, my: 1 }}>
            <ListItemText primary={subject.name} />

            <FormControl component="fieldset">
              <FormGroup row>
                {classes?.map((cls) => (
                  <FormControlLabel
                    key={cls.id}
                    control={
                      <Checkbox
                        checked={
                          selectedClasses[subject.code]?.includes(cls.code) ||
                          false
                        }
                        onChange={() => addHandler(subject.code, cls.code)}
                      />
                    }
                    label={cls.name}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Classes;
