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

const AdminOrders = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await CustomFetch.get(
        `/api/v1/orderRoutes/admin/orders`
      );
      return data;
    },
  });

  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: (id) =>
      CustomFetch.delete(`/api/v1/orderRoutes/admin/order/${id}`),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      QueryClient.invalidateQueries("products");
    },
    onError: (error) => {
      toast.error("Error deleting task");
    },
  });

  const [open2, setOpen2] = React.useState(false);
  const [productId, setId] = React.useState("");

  const handleClose2 = () => setOpen2(false);
  const handleOpen = (id) => {
    setOpen2(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen2(false);
  };

  const handleSingleDelete = async () => {
    await deleteProductMutation(productId);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <MainCard title="View Order Details">
        <Box>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table
              sx={{ minWidth: "75vw", width: "auto" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Order ID</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Items Qts</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Ordered At</StyledTableCell>
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
                {data &&
                  data.orders.reverse().map((value, index) => (
                    <StyledTableRow key={value._id}>
                      <StyledTableCell>{value._id}</StyledTableCell>
                      <StyledTableCell>{value.orderStatus}</StyledTableCell>
                      <StyledTableCell>
                        {value.orderItems.length}
                      </StyledTableCell>
                      <StyledTableCell>{value.totalPrice}</StyledTableCell>
                      <StyledTableCell>
                        {new Date(value.createAt).toLocaleString()}
                      </StyledTableCell>
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
                          <Link to={`/admin/orders_status/${value._id}`}>
                            <Icon
                              path={mdiSquareEditOutline}
                              size={1.2}
                              color="purple"
                              style={{ cursor: "pointer" }}
                            />
                          </Link>
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

export default AdminOrders;
