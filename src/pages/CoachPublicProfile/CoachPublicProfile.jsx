import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // if you are using react-router for routing
import { Flex, Box, Text, Image, Heading } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase'; // Adjust the path as necessary

const CoachPublicProfile = () => {
  const [coach, setCoach] = useState(null);
  const [availability, setAvailability] = useState([]);
  const { coachId } = useParams(); // get the coachId from the URL

  useEffect(() => {
    // Fetch the coach's data
    const fetchCoach = async () => {
      const docRef = doc(firestore, 'coaches', coachId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCoach(docSnap.data());
        // You would also fetch the coach's availability here
        // For now, I'm setting a static array to simulate fetched data
        setAvailability([
          { date: 'Today', slots: ['3:00 PM', '4:00 PM', '5:00 PM'] },
          // ... more dates and slots
        ]);
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
      <Box flex="1" ml={['0', '4']} mt={['4', '0']}>
        {availability.map(day => (
          <Box key={day.date} mb="4">
            <Heading as="h3" size="md" mb="2" fontWeight="bold">{day.date}</Heading>
            {day.slots.map(slot => (
              <Text key={slot}>{slot}</Text>
            ))}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default CoachPublicProfile;
