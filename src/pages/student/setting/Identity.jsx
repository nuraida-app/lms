import { Box, TextField } from "@mui/material";
import "./styles.css";

const Identity = () => {
  return (
    <div className="wrapper">
      <TextField label="NIS" />

      <TextField label="Full Name" />

      <TextField label="Birth Place" />

      <TextField label="Birth Day" />
    </div>
  );
};

export default Identity;
