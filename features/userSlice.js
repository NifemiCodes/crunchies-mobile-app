import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      name: "",
      email: "",
      password: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      console.log("previous state -> ", state);
      state.value = action.payload;
      console.log("new state -> ", state);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
