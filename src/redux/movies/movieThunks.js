// src/redux/movieThunks.js

import axios from "axios";
import { setMovies, setError, setPage } from "./movieSlice";

const OMDb_API_KEY = "20a805e0";

export const fetchMovies = (searchTerm, page) => async (dispatch) => {
  dispatch(setError(""));
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${OMDb_API_KEY}&s=${searchTerm}&page=${page}`
    );
    if (response.data.Response === "True") {
      dispatch(setMovies({
        movies: response.data.Search,
        totalPages: Math.ceil(response.data.totalResults / 10)
      }));
    } else {
      dispatch(setError(response.data.Error));
    }
  } catch (err) {
    dispatch(setError("An error occurred while fetching the data."));
  }
};
