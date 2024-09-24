import { createSlice } from "@reduxjs/toolkit";

const cartCounterSlice = createSlice({
  name: "cartCounter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
      console.log("items in cart: " + state.value);
    },

    decrement: (state) => {
      state.value -= 1;
      console.log("items in cart: " + state.value);
    },
  },
});

export const { increment, decrement } = cartCounterSlice.actions;
export default cartCounterSlice.reducer;
