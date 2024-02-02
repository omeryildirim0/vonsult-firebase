import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // if you are using react-router for routing
import { Flex, Box, Text, Image, Heading, HStack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase'; // Adjust the path as necessary
import useFetchAvailability from '../../hooks/useFetchAvailability';
import moment from 'moment-timezone';

const CoachPublicProfile = () => {
  const [coach, setCoach] = useState(null);
  const [availability, setAvailability] = useState([]);
  const { coachId } = useParams(); // get the coachId from the URL
  const { fetchedAvailabilities, isLoadingAvailabilities, fetchError } = useFetchAvailability(coachId);


  useEffect(() => {
    // Fetch the coach's data
    const fetchCoach = async () => {
      const docRef = doc(firestore, 'coaches', coachId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCoach(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    };

    fetchCoach();
  }, [coachId]);

  return (
    <Flex direction={['column', 'row']} m="4">
      <Box flex="1" borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
        {coach && (
          <>
            <Image src={coach.profilePicURL} alt={coach.fullName} mb="4" />
            <Heading as="h2" size="lg" mb="2">{coach.fullName}</Heading>
            <Text color="gray.500">{coach.bio}</Text>
            {/* Other profile details */}
          </>
        )}
      </Box>
      <Box mt={4}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>Coach's Availabilities:</Text>
        {isLoadingAvailabilities ? (
          <Text>Loading...</Text>
        ) : fetchError ? (
          <Text color="red.500">Error: {fetchError.message}</Text>
        ) : (
          fetchedAvailabilities.map((availability) => (
            // Check if there are no time slots for this date
            availability.timeSlots.length === 0 ? null : (
              <Box key={availability.id} p={2} border="1px solid" borderColor="gray.200" borderRadius="md">
                {/* This will ensure the date is displayed correctly above each set of time slots */}
                <Text fontWeight="bold">{moment(availability.id).format('LL')}</Text>
                <HStack wrap="wrap" spacing={4}>
                  {availability.timeSlots.map((timeSlot, index) => (
                    <Tag size="md" key={index} borderRadius="full" m={1}>
                      <TagLabel>{timeSlot}</TagLabel>
                      <TagCloseButton onClick={() => removeTimeSlot(availability.id, timeSlot)} />
                    </Tag>
                  ))}
                </HStack>
              </Box>
            )
          ))
        )}
      </Box>
    </Flex>
  );
};

export default CoachPublicProfile;
