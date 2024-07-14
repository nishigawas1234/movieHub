import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    loggedinUser: undefined,
  },
  reducers: {
    setLoggedInUser(state, action) {
      state.loggedinUser = action.payload;
    },
    removedLoggedInUser(state) {
        state.loggedinUser = undefined;
      },
  },
});

export const { removedLoggedInUser , setLoggedInUser} = userSlice.actions;
export default userSlice.reducer;
