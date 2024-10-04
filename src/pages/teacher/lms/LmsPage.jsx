import React from "react";
import Layout from "../components/layout/Layout";
import { useGetSubjectsQuery } from "../../../state-control/api/subjectApi";
import { Box } from "@mui/material";
import Subjects from "./Subjects";

const LmsPage = () => {
  const { data } = useGetSubjectsQuery();

  return (
    <Layout>
      <Box sx={{ display: "flex", gap: 1 }}>
        {data?.map((item) => (
          <Subjects key={item.code} data={item} />
        ))}
      </Box>
    </Layout>
  );
};

export default LmsPage;
