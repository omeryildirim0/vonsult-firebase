import React, { useState, useEffect } from "react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { firestore } from "../../firebase/firebase"; // Adjust the path as necessary
import { collection, getDocs } from "firebase/firestore";
import { Flex, Box, Center, Heading, Stack } from "@chakra-ui/react";
import CoachCard from "./CoachCard"; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const CoachCarousel = () => {
  const [coaches, setCoaches] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (coachId) => {
    navigate(`/coach/${coachId}`);
  };

  function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "coaches"));
      const coachesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const shuffledCoaches = shuffleArray(coachesData);
      setCoaches(shuffledCoaches);
    };
  
    fetchData();
  }, []);
  

  // Define how many cards to show based on the current breakpoint
  const cardsToShow = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 });

  // Function to slice the array of coaches based on the cardsToShow value
  const visibleCoaches = coaches.slice(0, cardsToShow);

  return (
    <Center w="full" mt="4">
      {/* Stack for vertical layout */}
      <Stack spacing={4} align="center" w="full">
        {/* Header */}
        <Heading as="h2" size="xl" textAlign="center">
          Top Influencers at Your Fingertips
        </Heading>

        {/* Flex container for cards */}
        <Flex
          direction="row"
          overflowX="scroll"
          wrap="nowrap"
          justifyContent="center"
          align="center"
          w="full" // Ensure Flex container takes full width
        >
          {visibleCoaches.map(coach => (
            <Box  key={coach.id} mx="0">
              <CoachCard 
                name={coach.fullName} 
                bio={coach.bio} 
                imageUrl={coach.profilePicURL} 
                hourlyRate={coach.hourlyRate}
                onClick={() => handleCardClick(coach.id)}
              />
            </Box>
          ))}
        </Flex>
      </Stack>
    </Center>
  );
};

export default CoachCarousel;
