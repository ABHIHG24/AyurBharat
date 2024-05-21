import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import { CustomFetch } from "../../axios/Costomaxios";
import { useEffect } from "react";

const defaultState = {
  orders: {},
  myOrders: {},
  singleDetails: {},
};

const getInfoFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("shippingInfo")) || defaultState;
};
const initialState = getInfoFromLocalStorage();

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    shippingInfo: (state, action) => {
      const shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
    },

    createOrder: (state, action) => {
      const order = action.payload;
      console.log(order);

      CustomFetch.post("/api/v1/orderRoutes/order/new", order)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    myOrders: (state, action) => {
      state.myOrders = action.payload;
    },
    orderDetails: (state, action) => {
      state.singleDetails = action.payload;
    },
  },
});

export const fetchMyOrders = () => async (dispatch) => {
  try {
    const res = await CustomFetch("/api/v1/orderRoutes/orders/me");
    dispatch(myOrders(res.data.orders));
  } catch (error) {
    console.log(error);
  }
};
export const fetchOrdersDetails = (id) => async (dispatch) => {
  try {
    const res = await CustomFetch(`/api/v1/orderRoutes/order/${id}`);
    // console.log(res.data.order);
    dispatch(orderDetails(res.data.order));
  } catch (error) {
    console.log(error);
  }
};

export const { shippingInfo, createOrder, myOrders, orderDetails } =
  orderSlice.actions;

export default orderSlice.reducer;
