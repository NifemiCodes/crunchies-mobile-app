import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { value: initialState },
  reducers: {
    incrementCartCount: state => {
      state.value.cartCount += 1;
    },

    decrementCartCount: state => {
      state.value.cartCount -= 1;
    },

    addToCart: ({ value }, { payload }) => {
      value.cartItems.push(payload);
    },

    removeFromCart: ({ value }, { payload }) => {
      value.cartItems = value.cartItems.filter(item => item.id !== payload.id);
    },

    updateItemCount: ({ value }, { payload }) => {
      const item = value.cartItems.find(item => item.id === payload.id);
      const itemIndex = value.cartItems.findIndex(item => item.id === payload.id);
      const newItem = {
        ...item,
        productCount: payload.productCount,
      };
      value.cartItems[itemIndex] = newItem;
    },

    resetCart: state => {
      state.value = initialState;
    },
  },
});

export const { incrementCartCount, decrementCartCount, addToCart, updateItemCount, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
