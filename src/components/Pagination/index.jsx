import React from "react";
import { HStack, Button, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <HStack spacing={2} justifyContent="center" mt={6}>
      <IconButton
        icon={<ArrowLeftIcon color="primary.500"/>}
        onClick={() => onPageChange(1)}
        isDisabled={currentPage === 1}
        variant="outline"
        color="primary.500"
        colorScheme="primary"
        aria-label="First Page"
      />
      <IconButton
        icon={<ChevronLeftIcon color="primary.500"/>}
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        variant="outline"
        color="primary.500"
        colorScheme="primary"
        aria-label="Previous Page"
      />
      <IconButton
        icon={<ChevronRightIcon color="primary.500"/>}
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        variant="outline"
        color="primary.500"
        colorScheme="primary"
        aria-label="Next Page"
      />
      <IconButton
        icon={<ArrowRightIcon color="primary.500"/>}
        onClick={() => onPageChange(totalPages)}
        isDisabled={currentPage === totalPages}
        variant="outline"
        color="primary.500"
        colorScheme="primary"
        aria-label="Last Page"
      />
    </HStack>
  );
};

export default Pagination;
