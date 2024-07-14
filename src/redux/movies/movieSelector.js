// src/redux/selectors.js
import { createSelector } from "@reduxjs/toolkit";

export const selectMovies = (state) => state.movies.movies;
export const selectSearchTerm = (state) => state.movies.searchTerm;
export const selectError = (state) => state.movies.error;
export const selectPage = (state) => state.movies.page;
export const selectTotalPages = (state) => state.movies.totalPages;

export const selectWatchlist = (state) => state.watchlist;

export const selectMoviesByImdbIDs = (imdbIDs) =>
  createSelector([selectMovies], (movies) => {
    if (imdbIDs.length) {
      return movies.filter((movie) => imdbIDs.includes(movie.imdbID));
    } else {
      return movies;
    }
  });

  export const getSearchedMovies = (name) =>
    createSelector([selectMovies], (movies) => {
      if (name.length) {
        return movies.filter((movie) => movie.Title.indexOf(name) > -1);
      }
    });
