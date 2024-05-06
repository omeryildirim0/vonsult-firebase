import React from "react";
import { Box, Image, Text, Badge, Flex } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const CoachCard = ({ name, bio, imageUrl, hourlyRate, onClick }) => {
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      p={0} 
      width="300px"
      onClick={onClick} cursor="pointer"
    >
      <Image src={imageUrl} alt={name} width="300px" height="400px" objectFit="cover"/>
      <Box p="4" height="160px">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Text fontWeight="bold" isTruncated mr="2">
              {name}
            </Text>
            <CheckIcon color="green.500" /> {/* Verified tick next to the name */}
          </Flex>
          <Badge colorScheme="blue" px="2" borderRadius="full">
            Top Coach
          </Badge>
        </Flex>
        <Text color="gray.500" fontSize="sm" noOfLines={2} mt="2">
          {bio}
        </Text>
        {/* Display hourly rate */}
        <Text color="gray.600" fontSize="md" mt="2" fontWeight="bold">
          Hourly Rate: ${hourlyRate}
        </Text>
      </Box>
    </Box>
  );
};

export default CoachCard;
