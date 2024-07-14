import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movies/movieSlice";
import userSlice from "./user/userSlice"

const store = configureStore({
  reducer: {
    movies: movieSlice ,
    users : userSlice
  },
});

export default store;
