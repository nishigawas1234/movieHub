import React from "react";
import BasicCard from ".";
import {
  Box,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
  Stack,
  Divider,
  Heading,
  ButtonGroup,
  Image,
  HStack,
  Badge,
  useDisclosure
} from "@chakra-ui/react";
import { StarIcon, CheckIcon } from "@chakra-ui/icons";
import MovieDetailModal from "../Model/ViewDetails";

export default function MovieCard({ data, type, isAdded, secondaryBtnHandler }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <BasicCard maxW="sm" bg="#fff" pos="relative" h="650px">
        {/* Badge for Added Movie */}
        {isAdded && type === "all" && (
          <Badge
            colorScheme="green"
            variant="solid"
            position="absolute"
            top="10px"
            right="10px"
            borderRadius="full"
            p="2"
            fontSize="sm"
            color="white"
          >
            <HStack spacing="2">
              <CheckIcon />
              <Text>Add to Watchlist</Text>
            </HStack>
          </Badge>
        )}

        <CardBody>
          <Image
            src={data.Poster}
            alt={data.Title}
            borderRadius="lg"
            width="100%"
            height="400px"
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" color="gray.500">
              {data.Title}
            </Heading>
            <HStack>
              <StarIcon color="yellow.500" />
              <Text>4.5</Text>
            </HStack>
            <Text color="gray.500">({data.Year})</Text>
          </Stack>
        </CardBody>
        <Divider bg="gray.500" />
        <CardFooter justifyContent="end">
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="primary" bg="primary.500" onClick={onOpen}>
              View Details
            </Button>
            <Button variant="ghost" color="primary.500" colorScheme="primary" onClick={secondaryBtnHandler}>
              {isAdded ? "Remove" : "Add to Watchlist"}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </BasicCard>
      <MovieDetailModal isOpen={isOpen} onClose={onClose} movie={data} />
    </>
  );
}
