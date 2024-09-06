import { Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";

const Academic = () => {
  const [value, setValue] = useState("");

  return (
    <Paper
      sx={{
        p: 1,
        width: "100%",
        height: "75vh",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "100%",
        }}
      >
        <TextField
          fullWidth
          label="School Origin"
          size="small"
          variant="standard"
          name="schoolOrigin"
          required
        />
        <TextField
          fullWidth
          type="number"
          label="NPSN"
          size="small"
          variant="standard"
          name="npsn"
          required
        />
        <TextField
          fullWidth
          label="Province"
          size="small"
          variant="standard"
          name="schoolProvince"
          required
        />
        <TextField
          fullWidth
          label="City"
          size="small"
          variant="standard"
          name="schoolCity"
          required
        />
        <TextField
          fullWidth
          label="District"
          size="small"
          variant="standard"
          name="schoolDistrict"
          required
        />

        <ReactQuill
          theme="snow"
          placeholder="Formal Education History"
          value={value}
          onChange={setValue}
          style={{ height: 100 }}
        />

        <Button
          sx={{ mt: 6 }}
          fullWidth
          variant="contained"
          color="success"
          type="submit"
        >
          save
        </Button>
      </form>
    </Paper>
  );
};

export default Academic;
