const { createSlice } = require("@reduxjs/toolkit");

const passwordSlice = createSlice({
  name: "password",
  initialState: { value: { email: "" } },
  reducers: {
    setPasswordEmail: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPasswordEmail } = passwordSlice.actions;
export default passwordSlice.reducer;
