import {
  Box,
  VStack,
  Text,
  Grid,
  GridItem,
  InputGroup,
  HStack,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/Card/MovieCard";
import SearchIcon from "../components/Icons/SearchIcon";
import Pagination from "../components/Pagination";
import Skelton from "../components/Common/Skelton";
import { fetchMovies } from "../redux/movies/movieThunks";
import {
  selectMovies,
  selectSearchTerm,
  selectError,
  selectPage,
  selectTotalPages
} from "../redux/movies/movieSelector";
import {setPage,setSearchTerm} from "../redux/movies/movieSlice"
import {addUpdateWatchListData, getWatchListData} from "../utils/HandleLocalStorange/watchlistData"
import { getLoggedinUser } from "../utils/HandleLocalStorange/userData";

export default function Home() {
  const dispatch = useDispatch();
  const userName = getLoggedinUser();
  const searchTerm = useSelector(selectSearchTerm);
  const movies = useSelector(selectMovies);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const [watchListMovies , setWatchListMovies] = useState([])

  useEffect(() => {
    dispatch(fetchMovies(searchTerm, page));
  }, [dispatch, page, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setPage(1));
    dispatch(fetchMovies(searchTerm, 1));
  };

  const onPageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const isAdded = (imdbID) => {
    const data = getWatchListData()
    const ids = data[userName] || [];
    const itemExists = ids.includes(imdbID);
    return itemExists;
  };

  const removeItem = (imdbIDs) => {
    const data = getWatchListData()
    const ids = data[userName] || [];
    const watchListMovies = ids.filter(id => id !== imdbIDs);
    addUpdateWatchListData(userName,watchListMovies)
    filterMoviesByUsername(userName, getWatchListData(), movies)
    dispatch(fetchMovies(searchTerm, page));
  };
  

  function filterMoviesByUsername(username, getWatchListData, movies) {
    const imdbIDs = getWatchListData[username] || [];
    return movies.filter(movie => imdbIDs.includes(movie.imdbID));

  }



  const addItem = (imdbID) => {
    watchListMovies.push(imdbID)
    addUpdateWatchListData(userName,watchListMovies)
    dispatch(fetchMovies(searchTerm, page));
  }


  return (
    <Box p={5} bg="primary.50">
      <VStack
        p={10}
        border="1px solid"
        borderColor="gray.500"
        borderRadius="8px"
      >
        <Text color="gray.500" fontWeight="700" fontSize={{ base: "2xl", md: "4xl" }}>
          Welcome to MovieHub
        </Text>
        <Text color="gray.500">Explore the Journey of Cinematic World.</Text>
      </VStack>
      <form onSubmit={handleSearch} style={{ width: "100%" }}>
        <HStack my={4} w="100%" justifyContent="flex-end">
          <InputGroup
            bg="contrast.100"
            borderRadius="16px"
            w={{ base: "100%", md: "60%" }}
          >
            <Input
              placeholder="Search Movie by name"
              color="gray.500"
              fontSize="md"
              h="50px"
              borderRadius="30px"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              _placeholder={{
                fontSize: "md",
                color: "gray.400",
              }}
            />
            <InputRightElement
              borderRadius="0 30px 30px 0"
              h="50px"
              w="75px"
              onClick={handleSearch}
              style={{
                background:
                  "linear-gradient(98.37deg, #f89e00 .99%, #da2f68 100%)",
              }}
            >
              <SearchIcon h="18px" w="18px" top="-3px" color="black" />
            </InputRightElement>
          </InputGroup>
        </HStack>
      </form>
      <Text color="primary.500" fontSize={{ base: "xl", md: "2xl" }} fontWeight="700">
        All Movies
      </Text>
      {error && (
        <Box>
          <Text>{error}</Text>
        </Box>
      )}
      {!error && movies.length === 0 ? (
        <Box>
          <Skelton />
        </Box>
      ) : (
        <Grid mt={4} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)", xl: "repeat(3, 1fr)", "2xl": "repeat(4, 1fr)" }} gap={4}>
          {movies.map((movie, i) => (
            <GridItem key={i}>
              <MovieCard
                data={movie}
                type="all"
                isAdded={isAdded(movie.imdbID)}
                secondaryBtnHandler={() => {
                  if (isAdded(movie.imdbID)) {
                    removeItem(movie.imdbID);
                  } else {
                    addItem(movie.imdbID);
                  }
                }}
              />
            </GridItem>
          ))}
        </Grid>
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Box>
  );
}
