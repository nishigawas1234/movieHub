import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Stack,
  Image,
  HStack,
  Divider,
  Box
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const MovieDetailModal = ({ isOpen, onClose, movie }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent maxW="80%">
        <ModalHeader fontSize="2xl" fontWeight="bold" color="primary.500">
          {movie.Title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing="4" align="start">
            <Image
              src={movie.Poster}
              alt={movie.Title}
              borderRadius="lg"
              boxSize="300px"
              objectFit="cover"
            />
            <Stack spacing="4" flex="1">
              <Text fontSize="lg" fontWeight="bold">
                {movie.Title}
              </Text>
              <HStack spacing="1">
                <StarIcon color="yellow.500" />
                <Text>{4.5}</Text>
              </HStack>
              <Text fontSize="md" color="gray.600">
                {movie.Plot}
              </Text>
              <Divider my="4" />
              <Box>
                <Text fontSize="sm"  mb="4" color="gray.500">
                  Type: {movie.Type}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Year: {movie.Year}
                </Text>
            
              </Box>
            </Stack>
          </HStack>
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
