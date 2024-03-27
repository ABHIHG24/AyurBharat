import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CustomFetch } from "../../axios/Costomaxios";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);

      if (item) {
        const newTotalAmount = item.amount + product.amount;

        console.log(product);
        if (newTotalAmount > product.stock) {
          item.amount = product.stock;
        } else {
          item.amount += product.amount;
        }
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success("Item added to cart");
    },

    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.info("Item removed from cart");
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated");
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    newReview: (state, action) => {
      const review = action.payload;

      CustomFetch.put("/api/product/review", review)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export const { addItem, clearCart, removeItem, editItem, newReview } =
  cartSlice.actions;

export const asyncAddItem = (product) => async (dispatch) => {
  try {
    const response = await CustomFetch.post(`/api/cart/postCartItems`, product);
    dispatch(addItem(response.data));
  } catch (error) {
    console.error("Error adding item to cart:", error);
    toast.error("Failed to add item to cart");
  }
};

// export const asyncRemoveItem = (cartID) => async (dispatch) => {
//   try {
//     const response = await CustomFetch.delete(`/api/cart/getCartItems/${cartID}`);
//     dispatch(removeItem(response.data));
//     toast.error("Item removed from cart");
//   } catch (error) {
//     console.error("Error removing item from cart:", error);
//     toast.error("Failed to remove item from cart");
//   }

export default cartSlice.reducer;
