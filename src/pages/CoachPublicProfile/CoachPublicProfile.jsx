import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // if you are using react-router for routing
import { Flex, Box, Text, Image, Heading, HStack, Tag, TagLabel, Button, VStack } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase'; // Adjust the path as necessary
import useFetchAvailability from '../../hooks/useFetchAvailability';
import moment from 'moment-timezone';

const CoachPublicProfile = () => {
  const [coach, setCoach] = useState(null);
  const [availability, setAvailability] = useState([]);
  const { coachId } = useParams(); // get the coachId from the URL
  const { fetchedAvailabilities, isLoadingAvailabilities, fetchError } = useFetchAvailability(coachId);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);


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

  const handleDurationSelect = (minutes) => {
    setSelectedDuration(minutes);
    // Only update appointment details if a time slot has been selected
    if (selectedTimeSlot) {
      const [date, time] = selectedTimeSlot.split('-');
      setAppointmentDetails(prevDetails => ({
        ...prevDetails,
        price: calculatePrice(minutes, coach.hourlyRate),
      }));
    }
  };
  

  const handleTimeSlotSelect = (selectedDate, timeSlot) => {
    const uniqueTimeSlotIdentifier = `${selectedDate}-${timeSlot}`;
    setSelectedTimeSlot(uniqueTimeSlotIdentifier);
    const startTime = timeSlot.split('-')[0].trim(); // This will get the start time from the timeSlot
    setAppointmentDetails({
      date: moment(selectedDate).format('LL'),
      time: startTime, // Use only the start time
      // Ensure the correct price is calculated with the already selected duration
      price: calculatePrice(selectedDuration || 60, coach.hourlyRate),
    });
  };

  

  const calculatePrice = (duration, hourlyRate) => {
    if (duration === 30) {
      return (hourlyRate / 2).toFixed(2); // Half of the hourly rate for 30 minutes
    } else {
      return hourlyRate; // Full hourly rate for 60 minutes
    }
  };


  return (
    <Flex direction={['column', 'row']} m="4" align="stretch">
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


      <Box flex="2" mt={{ base: 4, md: 0 }} ml={{ base: 0, md: 4 }} pl={{ base: 0, md: 4 }}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>Book a Video Call</Text>
        <HStack spacing={4}>
          <Button
            colorScheme="blue"
            variant={selectedDuration === 30 ? 'solid' : 'outline'}
            onClick={() => handleDurationSelect(30)}
          >
            30 Minutes
          </Button>
          <Button
            colorScheme="blue"
            variant={selectedDuration === 60 ? 'solid' : 'outline'}
            onClick={() => handleDurationSelect(60)}
          >
            60 Minutes
          </Button>
        </HStack>
        
        <Box
          maxH="400px" // Set a maximum height for the container
          overflowY="auto" // Enable vertical scrolling
          p={2}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
        >
          {isLoadingAvailabilities ? (
            <Text>Loading...</Text>
          ) : fetchError ? (
            <Text color="red.500">Error: {fetchError.message}</Text>
          ) : (
            fetchedAvailabilities.map((availability) => (
              availability.timeSlots.length === 0 ? null : (
                <Box key={availability.id} p={2} border="1px solid" borderColor="gray.200" borderRadius="md">
                  <Text fontWeight="bold">{moment(availability.id).format('LL')}</Text>
                  <HStack wrap="wrap" spacing={4}>
                    {availability.timeSlots.map((timeSlot) => (
                      <Button 
                        size="md" 
                        key={`${availability.id}-${timeSlot}`} // Updated key to be unique
                        borderRadius="full" 
                        m={1}
                        bg={selectedTimeSlot === `${availability.id}-${timeSlot}` ? 'teal.500' : 'gray.200'}
                        color={selectedTimeSlot === `${availability.id}-${timeSlot}` ? 'white' : 'black'}
                        _hover={{
                          bg: selectedTimeSlot === `${availability.id}-${timeSlot}` ? 'teal.600' : 'gray.300',
                        }}
                        onClick={() => handleTimeSlotSelect(availability.id, timeSlot)} // Ensure selectedDate corresponds to the actual date value
                      >
                        {timeSlot}
                      </Button>
                    ))}
                  </HStack>
                </Box>
              )
            ))
          )}

        </Box>

        <Box mt={4}>
          {appointmentDetails && (
            <VStack mt={4} p={4} borderWidth="1px" borderRadius="lg" align="stretch">
              <Text fontSize="md">Appointment Summary</Text>
              <Text fontSize="lg" fontWeight="bold">{appointmentDetails.date} at {appointmentDetails.time}</Text>
              <Text fontSize="lg" color="blue.500">${appointmentDetails.price}</Text>
              <Button colorScheme="blue" onClick={() => {/* logic to handle the next step */}}>Next</Button>
            </VStack>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default CoachPublicProfile;
