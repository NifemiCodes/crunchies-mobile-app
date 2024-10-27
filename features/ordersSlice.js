import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ordersSlice = createSlice({
  name: "orders",
  initialState: { value: initialState },
  reducers: {
    addOrder: (state, action) => {
      state.value = [...state.value, ...action.payload];
    },

    setOrders: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addOrder, setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
