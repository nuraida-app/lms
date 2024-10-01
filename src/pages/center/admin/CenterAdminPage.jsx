import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Box,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  useGetAdminsQuery,
  useGetDetailAdminQuery,
} from "../../../state-control/api/adminApi";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AdminEdit from "./AdminEdit";

const CenterAdminPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const { data } = useGetAdminsQuery();
  const { data: admin } = useGetDetailAdminQuery(id, { skip: !id });

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const editHandler = () => {
    setEdit(true);
  };

  return (
    <Layout>
      <Paper sx={{ p: 1 }}>
        <Box>
          <Input placeholder="Search Admin" />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {["Name", "Email", "Role", "Action"].map((item) => (
                  <TableCell key={item} align="center">
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell align="center">{admin.name}</TableCell>
                  <TableCell align="center">{admin.email}</TableCell>
                  <TableCell align="center">{admin.role}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => handleClick(e, admin.id)}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={editHandler}>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </Menu>

        <AdminEdit open={edit} close={() => setEdit(false)} admin={admin} />
      </Paper>
    </Layout>
  );
};

export default CenterAdminPage;
