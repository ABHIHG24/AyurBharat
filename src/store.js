import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/Cart/cartSlice";
import userReducer from "./features/User/userSlice";
import orderReducer from "./features/Order/OrderSlice";

const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
    orderState: orderReducer,
  },
});

export default store;
