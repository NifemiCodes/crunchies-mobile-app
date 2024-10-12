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
      console.log(value.price);
    },

    setCheckoutCount: ({ value }, { payload }) => {
      value.count = payload;
      console.log(value.count);
    },
  },
});

export const { setCheckoutPrice, setCheckoutCount } = checkoutSlice.actions;
export default checkoutSlice.reducer;
