import React, { useState, useEffect } from "react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { firestore } from "../../firebase/firebase"; // Adjust the path as necessary
import { collection, getDocs } from "firebase/firestore";
import { Flex, Box } from "@chakra-ui/react";
import CoachCard from "./CoachCard"; // Adjust the path as necessary

const CoachCarousel = () => {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(firestore, "coaches"));
        const coachesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCoaches(coachesData);
    };

    fetchData();
  }, []);

  // Define how many cards to show based on the current breakpoint
  const cardsToShow = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 });

  // Function to slice the array of coaches based on the cardsToShow value
  const visibleCoaches = coaches.slice(0, cardsToShow);

  return (
    <Flex
        direction="row"
        overflowX="scroll"
        wrap="nowrap"
    >
      {visibleCoaches.map(coach => (
        <Box minWidth={["100%", "50%", "33.33%", "25%", "20%"]} key={coach.id}>
          <CoachCard name={coach.fullName} bio={coach.bio} imageUrl={coach.profilePicURL} />
        </Box>
      ))}
    </Flex>
  );
};

export default CoachCarousel;
