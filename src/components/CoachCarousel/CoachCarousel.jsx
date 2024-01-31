import React, { useState, useEffect } from "react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { firestore } from "../../firebase/firebase"; // Adjust the path as necessary
import { collection, getDocs } from "firebase/firestore";
import { Flex, Box, Center } from "@chakra-ui/react";
import CoachCard from "./CoachCard"; // Adjust the path as necessary

const CoachCarousel = () => {
  const [coaches, setCoaches] = useState([]);

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
    <Center w="full"> {/* Wraps the Flex container to ensure it takes full width */}
      <Flex
          direction="row"
          overflowX="scroll"
          wrap="nowrap"
          justifyContent="center" // This will center the cards in the Flex container
          align="center" // This will align the cards vertically
      >
        {visibleCoaches.map(coach => (
          <Box minWidth={["100%", "50%", "33.33%", "25%", "20%"]} key={coach.id} mx="0"> {/* Adds margin to the sides of each Box */}
            <CoachCard name={coach.fullName} bio={coach.bio} imageUrl={coach.profilePicURL} />
          </Box>
        ))}
      </Flex>
    </Center>
  );
};

export default CoachCarousel;
