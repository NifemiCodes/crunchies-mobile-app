import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: "",
  count: 0,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: { value: initialState },
  reducers: {
    setCheckoutPrice: ({ value }, { payload }) => {
      value.price = payload;
    },

    setCheckoutCount: ({ value }, { payload }) => {
      value.count = payload;
    },
  },
});

export const { setCheckoutPrice, setCheckoutCount } = checkoutSlice.actions;
export default checkoutSlice.reducer;
