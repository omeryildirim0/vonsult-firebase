import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useHistory for navigation
import { Flex, Box, Text, Image, Heading, HStack, Button, VStack } from '@chakra-ui/react';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import useFetchAvailability from '../../hooks/useFetchAvailability';
import moment from 'moment-timezone';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { loadStripe } from '@stripe/stripe-js';

const stripekey = 'pk_test_51Ogs1vD1CJUmd99lHC4lWLu1rP3iDfA04Ygd17fl4yy5ysyQd8x501bcmFn9vrMqwMUXSgOXosy6UvVvM12vsTlV0052blYUEv'
const stripePromise = loadStripe(stripekey);

const CoachPublicProfile = () => {
  const [coach, setCoach] = useState(null);
  const [priceId, setPriceId] = useState(null);
  const [availability, setAvailability] = useState([]);
  const { coachId } = useParams();
  const { fetchedAvailabilities, isLoadingAvailabilities, fetchError } = useFetchAvailability(coachId);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [authUser] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoachAndPrice = async () => {
      const docRef = doc(firestore, 'coaches', coachId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setCoach(docSnap.data());
        //console.log('Coach data:', docSnap.data());
        const stripePriceId = docSnap.data().stripePriceId;
        setPriceId(stripePriceId);
        //console.log('Stripe price ID:', stripePriceId);
      } else {
        console.log('Coach document does not exist!');
      }
    };
  
    fetchCoachAndPrice();
  }, [coachId]);
  
  
  
  

  const handleDurationSelect = (minutes) => {
    setSelectedDuration(minutes);
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
    const startTime = timeSlot.split('-')[0].trim();
    setAppointmentDetails({
      date: moment(selectedDate).format('LL'),
      time: startTime,
      price: calculatePrice(selectedDuration || 60, coach.hourlyRate),
    });
  };

  const calculatePrice = (duration, hourlyRate) => {
    if (duration === 30) {
      return (hourlyRate / 2).toFixed(2);
    } else {
      return hourlyRate;
    }
  };

  const handleNextButtonClick = async () => {
    // a. Check if the user is authenticated or not.
    if (!authUser) {
      // d. if the user is not authenticated, redirect to the sign-in page.
      navigate('/sign-in');
      return;
    }

    // e. Create a new checkout session
    try {
      // Before creating the Stripe session, save appointment details to Firestore
      const appointmentRef = await addDoc(collection(firestore, "appointments"), appointmentDetails);
      const appointmentId = appointmentRef.id;


      const stripe = await stripePromise;
      const response = await fetch('https://us-central1-vonsult.cloudfunctions.net/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Pass any necessary information for creating the checkout session
        body: JSON.stringify({
          priceId: priceId,
          appointmentId: appointmentId,
          // You can add more details here which are required for your backend to create the session
          // For example, the date and time of the appointment, the duration, etc.
        }),
      });

      const session = await response.json();
      console.log('Session:', session);
      // f. Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
    
      if (result.error) {
        // Inform the user if there's an error
        console.error(result.error.message);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
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
          maxH="400px"
          overflowY="auto"
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
                        key={`${availability.id}-${timeSlot}`} 
                        borderRadius="full" 
                        m={1}
                        bg={selectedTimeSlot === `${availability.id}-${timeSlot}` ? 'teal.500' : 'gray.200'}
                        color={selectedTimeSlot === `${availability.id}-${timeSlot}` ? 'white' : 'black'}
                        _hover={{
                          bg: selectedTimeSlot === `${availability.id}-${timeSlot}` ? 'teal.600' : 'gray.300',
                        }}
                        onClick={() => handleTimeSlotSelect(availability.id, timeSlot)}
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
              <Button colorScheme="blue" onClick={handleNextButtonClick}>Next</Button>
            </VStack>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default CoachPublicProfile;
