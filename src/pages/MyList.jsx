
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

export default function MyList() {
  const [error, setError] = useState("");
  const [watchlistData, setWatchlistData] = useState([]);
  useEffect(()=>{
   const watchlistData = JSON.parse(localStorage.getItem('watchlist')) || [];
   console.log(watchlistData,"watchlistData")
   setWatchlistData(watchlistData)
  },[watchlistData])

  const removeItem = (imdbID)=>{
    const updatedItems = watchlistData.filter(item => item.imdbID !== imdbID);
    localStorage.setItem("watchlist", JSON.stringify(updatedItems));
    setWatchlistData(updatedItems)
  }

 const isAdded = (imdbID) =>{
  const itemExists = watchlistData.some(item => item.imdbID === imdbID);
  if(itemExists){
    return true
  }
 }

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
      {error ? (
        <Box>  <Text>{error}</Text></Box>     
      ) : (
        <Grid mt={4} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)",xl: "repeat(3, 1fr)","2xl": "repeat(4, 1fr)" }}  gap={4}>
          {watchlistData.map((movie, i) => {
            return (
              <GridItem key={i}>
                <MovieCard data={movie} type="watchlist" isAdded={isAdded(movie.imdbID)} secondaryBtnHandler={() => removeItem(movie.imdbID)}/>
              </GridItem>
            );
          })}
        </Grid>
      )}
    </Box>
  )
}
