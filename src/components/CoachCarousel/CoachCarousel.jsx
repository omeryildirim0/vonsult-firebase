import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase"; // Adjust the path as necessary
import { collection, getDocs } from "firebase/firestore";
import { Flex } from "@chakra-ui/react";
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

  return (
    <Flex 
        direction="row" 
        overflowX="scroll"
    >
      {coaches.map(coach => (
        <CoachCard key={coach.id} name={coach.fullName} bio={coach.bio} imageUrl={coach.profilePicURL} />
      ))}
    </Flex>
  );
};

export default CoachCarousel;
