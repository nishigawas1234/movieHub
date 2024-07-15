import {
  Box,
  VStack,
  Text,
  Grid,
  GridItem,
  Button,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/Card/MovieCard";
import {
  addUpdateWatchListData,
  getWatchListData,
} from "../utils/HandleLocalStorange/watchlistData";
import { selectMovies } from "../redux/movies/movieSelector"; // Update this import path as needed
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movies/movieThunks"; // Update this import path as needed
import { getLoggedinUser } from "../utils/HandleLocalStorange/userData";
import { useNavigate } from "react-router-dom";

export default function MyList() {
  const userName = getLoggedinUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector(selectMovies);
  const [watchlistData, setWatchlistData] = useState([]);

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies("Batman", 1));
    }
    const initialWatchlistData = getWatchListData() || [];
    setWatchlistData(initialWatchlistData);
  }, [dispatch, movies.length]);

  const removeItem = (imdbIDs) => {
    const data = getWatchListData();
    const ids = data[userName] || [];
    const watchListMovies = ids.filter((id) => id !== imdbIDs);
    addUpdateWatchListData(userName, watchListMovies);
    filterMoviesByUsername(userName, getWatchListData(), movies);
  };
  const addMoviesRedirection = () => {
    navigate("/home");
  };

  const filterMoviesByUsername = (username, getWatchListData, movies) => {
    const imdbIDs = getWatchListData[username] || [];
    return movies.filter((movie) => imdbIDs.includes(movie.imdbID));
  }

  useEffect(() => {
    const data = filterMoviesByUsername(userName, getWatchListData(), movies);
    setWatchlistData(data);
  }, [removeItem]);

  return (
    <Box p={5} bg="primary.50">
      <VStack
        p={10}
        border="1px solid"
        borderColor="gray.500"
        borderRadius="8px"
        mb={4}
      >
        <Text color="gray.500" fontWeight="700" fontSize="4xl">
          Welcome to MovieHub
        </Text>
        <Text color="gray.500">Explore the Journey of Cinematic World.</Text>
      </VStack>
      <Text color="primary.500" fontSize="4xl" fontWeight="700">
        My watchlist
      </Text>
      {watchlistData?.length <= 0 ? (
        <Flex w="100%" h="500px" justifyContent="center" alignItems="center" flexDir="column">
            <Text fontSize="lg" mb={4}>Your Watchlist is empty</Text>
            <Button
              variant="solid"
              colorScheme="primary.500"
              bg="primary.500"
              onClick={addMoviesRedirection}
            >
              Add Movies
            </Button>
        </Flex>
      ) : (
        <Grid
          mt={4}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
            "2xl": "repeat(4, 1fr)",
          }}
          gap={4}
        >
          {watchlistData?.map((movie, i) => (
            <GridItem key={i}>
              <MovieCard
                data={movie}
                type="watchlist"
                isAdded={true}
                secondaryBtnHandler={() => removeItem(movie.imdbID)}
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
}
