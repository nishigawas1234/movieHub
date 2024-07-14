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
import Pagination from "../components/Pagination";
import Skelton from "../components/Common/Skelton";

const OMDb_API_KEY = "20a805e0";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("Batman");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [watchlistItem, setWatchlistItem] = useState([]);
  const [searchData, setSearchData] = useState(movies);

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
        setMovies(response.data.Search);
        setSearchData(response.data.Search);
        setTotalPages(Math.ceil(response.data.totalResults / 10));
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      setError("An error occurred while fetching the data.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
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

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const isAdded = (imdbID) => {
    const itemExists = watchlistItem.some((item) => item.imdbID === imdbID);
    return itemExists;
  };

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
              onChange={(e) => setSearchTerm(e.target.value)}
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
      {!error && searchData.length < 0 ? (
        <Box>
          <Skelton />
        </Box>
      ) : (
        <Grid mt={4} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)",xl: "repeat(3, 1fr)","2xl": "repeat(4, 1fr)" }} gap={4}>
          {searchData.map((movie, i) => (
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
