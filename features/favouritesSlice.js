import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: { value: initialState },
  reducers: {
    // add to favourites list
    addFavourite: (state, action) => {
      if (!state.value.includes(action.payload)) {
        state.value.push(action.payload);
      }
    },

    // remove from favourites list
    removeFavourite: (state, action) => {
      if (state.value.includes(action.payload)) {
        state.value = state.value.filter((item) => item !== action.payload);
      }
    },

    // set favourites list
    setFavourites: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addFavourite, removeFavourite, setFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
