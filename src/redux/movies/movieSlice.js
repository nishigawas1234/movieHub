import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    searchTerm: "Batman",
    movies: [],
    error: "",
    page: 1,
    totalPages: 1,
  },
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload.movies;
      state.totalPages = action.payload.totalPages;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setMovies, setError, setPage, setSearchTerm } = movieSlice.actions;
export default movieSlice.reducer;
