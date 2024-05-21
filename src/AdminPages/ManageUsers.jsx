import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Paper,
  Modal,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MainCard from "./Compoments/MainCard";
import Icon from "@mdi/react";
import { mdiSquareEditOutline } from "@mdi/js";
import { mdiDelete } from "@mdi/js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { CustomFetch } from "../axios/Costomaxios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 990,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 14,
  p: 2,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ManageUsers = () => {
  const [UserId, setId] = React.useState("");

  const queryClient = useQueryClient();
  const [user, setUser] = useState();
  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await CustomFetch.get(`/api/user/admin/users`);
      setUser(data.users);
      return data;
    },
  });

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: (id) => CustomFetch.delete(`/api/user/admin/user/${id}`),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      // toast.error("Error deleting task");
    },
  });
  const { mutate: userRole } = useMutation({
    mutationFn: (role) =>
      CustomFetch.put(`/api/user/admin/user/${UserId}`, { role }),
    onSuccess: () => {
      toast.success("update successfully");
      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      // toast.error("Error deleting task");
    },
  });

  const [open2, setOpen2] = React.useState(false);

  const handleClose2 = () => setOpen2(false);
  const handleOpen = (id) => {
    setOpen2(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen2(false);
  };

  const handleSingleDelete = async () => {
    setOpen2(false);
    await deleteUserMutation(UserId);
  };

  const handleRole = (role, UpdateId) => {
    setId(UpdateId);
    userRole(role);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <MainCard title="View Users Details">
        <Box>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table
              sx={{ minWidth: "75vw", width: "auto" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>username</StyledTableCell>
                  <StyledTableCell>image</StyledTableCell>
                  <StyledTableCell>email</StyledTableCell>
                  <StyledTableCell>role</StyledTableCell>
                  <StyledTableCell
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Action
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user &&
                  user.map((value, index) => (
                    <StyledTableRow key={value._id}>
                      <StyledTableCell>{value.username}</StyledTableCell>
                      <StyledTableCell>
                        <img
                          src={value.avatar}
                          alt="avatar"
                          style={{ width: "12rem", height: "12rem" }}
                        />
                      </StyledTableCell>
                      <StyledTableCell>{value.email}</StyledTableCell>
                      <StyledTableCell>{value.role}</StyledTableCell>
                      <StyledTableCell>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "20px",
                            justifyContent: "center",
                          }}
                        >
                          <Icon
                            path={mdiDelete}
                            size={1.2}
                            color="red"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleOpen(value._id)}
                          />

                          {value.role == "user" ? (
                            <button
                              className="btn btn-error"
                              onClick={() => {
                                handleRole("admin", value._id);
                              }}
                            >
                              Make him Admin
                            </button>
                          ) : (
                            <button
                              className="btn btn-error"
                              onClick={() => {
                                handleRole("user", value._id);
                              }}
                            >
                              Make him User
                            </button>
                          )}
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </MainCard>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <CardContent>
            <h3>Attempting to delete !</h3>
            <Typography variant="h5" color="text.secondary">
              Are you sure, you want to delete the record ?
            </Typography>
          </CardContent>
          <CardActions sx={{ float: "right" }}>
            <Button color="error" onClick={handleClose} size="small">
              Cancel
            </Button>
            <Button color="primary" onClick={handleSingleDelete} size="small">
              Yes, Delete
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

export default ManageUsers;
