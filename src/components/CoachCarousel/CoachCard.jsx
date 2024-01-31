import React from "react";
import { Box, Image, Text, Badge, Flex } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons"; // Import the CheckIcon for the verified tick

const CoachCard = ({ name, bio, imageUrl }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={0} maxWidth="300px">
      <Image src={imageUrl} alt={name} width="100%" height="auto" />
      <Box p="4">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Text fontWeight="bold" isTruncated mr="2">
              {name}
            </Text>
            <CheckIcon color="green.500" /> {/* Verified tick next to the name */}
          </Flex>
          <Badge colorScheme="blue" px="2" borderRadius="full">
            Top Expert
          </Badge>
        </Flex>
        <Text color="gray.500" fontSize="sm" noOfLines={2} mt="2">
          {bio}
        </Text>
      </Box>
    </Box>
  );
};

export default CoachCard;
