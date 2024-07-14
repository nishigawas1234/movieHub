import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Stack, Image, HStack, Divider } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const MovieDetailModal = ({ isOpen, onClose, movie }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{movie.Title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={movie.Poster} alt={movie.Title} borderRadius="lg" mb="4" />
          <Stack spacing="4">
            <Text fontSize="lg" fontWeight="bold">
              {movie.Title}
            </Text>
            <HStack>
              <StarIcon color="yellow.500" />
              <Text>{movie.Ratings ? movie.Ratings[0].Value : "N/A"}</Text>
            </HStack>
            <Text fontSize="md" color="gray.600">
              {movie.Plot}
            </Text>
            <Divider />
            <Text fontSize="sm" color="gray.500">
              Genre: {movie.Genre}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Year: {movie.Year}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Director: {movie.Director}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Actors: {movie.Actors}
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MovieDetailModal;
