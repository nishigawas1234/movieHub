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
import MovieCard from "../components/Card/MovieCard";
import SearchIcon from "../components/Icons/SearchIcon";
import axios from "axios";

const OMDb_API_KEY = "20a805e0";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("Batman");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [watchlistItem, setWatchlistItem] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlistItem(storedItems);
  }, []);

  const addItem = (movie) => {
    const newItem = movie;
    const updatedItems = [...watchlistItem, newItem];

    // Update the state and localStorage
    setWatchlistItem(updatedItems);
    localStorage.setItem("watchlist", JSON.stringify(updatedItems));
  };

  const fetchMovies = async () => {
    setError("");
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDb_API_KEY}&s=${searchTerm}&page=${page}`
      );
      if (response.data.Response === "True") {
        setMovies((prevMovies) => [...prevMovies, ...response.data.Search]);
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      setError("An error occurred while fetching the data.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMovies([]);
    setPage(1);
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, [page, searchTerm]);

  const removeItem = (imdbID) => {
    const updatedItems = watchlistItem.filter((item) => item.imdbID !== imdbID);
    localStorage.setItem("watchlist", JSON.stringify(updatedItems));
    setWatchlistItem(updatedItems);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  console.log(movies, "movies");

  const isAdded = (imdbID) => {
    const itemExists = watchlistItem.some((item) => item.imdbID === imdbID);
    console.log(itemExists, "itemExists");
    if (itemExists) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box p={5} bg="primary.50">
      <VStack
        p={10}
        border="1px solid"
        borderColor="gray.500"
        borderRadius="8px"
      >
        <Text color="gray.500" fontWeight="700" fontSize="4xl">
          Welcome to MovieHub
        </Text>
        <Text color="gray.500">Explore the Journey of Cinematic World.</Text>
      </VStack>
      <form onSubmit={handleSearch} style={{ width: "100%" }}>
        <HStack my={4} w="100%" justifyContent="flex-end">
          <InputGroup bg="#F2F2FD" borderRadius="16px" w={{ base: "100%", md: "60%" }}>
            <Input
              placeholder="Search Movie"
              color="#111"
              fontSize="md"
              h="50px"
              onChange={(e) => setSearchTerm(e.target.value)}
              _placeholder={{
                fontSize: "md",
                color: "#111",
              }}
            />
            <InputRightElement bg="primary.500" h="50px" onClick={handleSearch}>
              <SearchIcon h="18px" w="18px" top="-3px" color="black" />
            </InputRightElement>
          </InputGroup>
        </HStack>
      </form>
      <Text color="primary.500" fontSize="2xl" fontWeight="700">
      All Movies
      </Text>
      {error ? (
        <Box>
          <Text>{error}</Text>
        </Box>
      ) : (
        <Grid mt={4} templateColumns="repeat(4, 1fr)" gap={4}>
          {movies.map((movie, i) => {
            return (
              <GridItem key={i}>
                <MovieCard
                  data={movie}
                  type="all"
                  isAdded={isAdded(movie.imdbID)}
                  secondaryBtnHandler={() => {
                    if (isAdded(movie.imdbID)) {
                      removeItem(movie.imdbID);
                    } else {
                      addItem(movie);
                    }
                  }}
                />
              </GridItem>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
