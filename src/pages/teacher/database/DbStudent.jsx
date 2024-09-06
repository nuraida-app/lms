import { Box, Button, ButtonGroup, Grid, Paper } from "@mui/material";
import Layout from "../components/layout/Layout";
import PageName from "../../PageName";
import React, { useState } from "react";
import Student from "./Student";
import Family from "./Family";
import {
  useGetProvincesQuery,
  useGetStudentQuery,
} from "../../../state-control/api/dbApi";
import { useParams } from "react-router-dom";
import Parents from "./Parents";
import Health from "./Health";

const DbStudent = () => {
  const [student, setStudent] = useState(true);
  const [parents, setParents] = useState(false);
  const [family, setFamily] = useState(false);
  const [health, setHealth] = useState(false);

  const openStudent = () => {
    setStudent(true);
    setParents(false);
    setFamily(false);
    setHealth(false);
  };

  const openParents = () => {
    setStudent(false);
    setParents(true);
    setFamily(false);
    setHealth(false);
  };

  const openFamily = () => {
    setStudent(false);
    setParents(false);
    setFamily(true);
    setHealth(false);
  };

  const openHealth = () => {
    setStudent(false);
    setParents(false);
    setFamily(false);
    setHealth(true);
  };

  // Fetcing data
  const params = useParams();
  const { data: provinces } = useGetProvincesQuery();
  const { data: info } = useGetStudentQuery(params.nis, { skip: !params.nis });
  return (
    <Layout>
      <PageName title={"Database"} />
      <Grid
        container
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper>
            <ButtonGroup>
              <Button
                onClick={openStudent}
                variant={student ? "contained" : "outlined"}
                color="primary"
              >
                student
              </Button>
              {info && (
                <Button
                  onClick={openParents}
                  variant={parents ? "contained" : "outlined"}
                  color="primary"
                >
                  parents
                </Button>
              )}
              {info && (
                <Button
                  onClick={openFamily}
                  variant={family ? "contained" : "outlined"}
                  color="primary"
                >
                  family
                </Button>
              )}

              {info && (
                <Button
                  onClick={openHealth}
                  variant={health ? "contained" : "outlined"}
                  color="primary"
                >
                  health
                </Button>
              )}
            </ButtonGroup>
          </Paper>

          {student && (
            <Student
              provinces={provinces}
              info={info}
              name={params.studentName.replace(/-/g, " ")}
              nis={params.nis}
            />
          )}

          {parents && <Parents info={info} />}
          {family && <Family info={info} />}
          {health && <Health info={info} />}
        </Box>
      </Grid>
    </Layout>
  );
};

export default DbStudent;
