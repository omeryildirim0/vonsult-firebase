import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const CoachCard = ({ name, bio, imageUrl }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Image src={imageUrl} alt={name} boxSize="200px" />
      <Text fontWeight="bold">{name}</Text>
      <Text>{bio}</Text>
    </Box>
  );
};

export default CoachCard;
