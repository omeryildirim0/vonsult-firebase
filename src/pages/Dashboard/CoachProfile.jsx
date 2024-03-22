import React, { useState, useEffect } from 'react';
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { auth, firestore } from '../../firebase/firebase'; // ensure you have the correct path
import { doc, getDoc } from 'firebase/firestore';

const CoachProfile = () => {
  const [coachProfile, setCoachProfile] = useState(null);
  const cardBg = useColorModeValue('white', 'gray.700'); // Adjusts color based on theme
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const fetchProfile = async () => {
          const docRef = doc(firestore, "coaches", user.uid);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            setCoachProfile(docSnap.data());
          } else {
            console.log("No such document!");
          }
        };
  
        fetchProfile();
      } else {
        console.log("User not logged in");
        // Handle the user not being logged in (e.g., redirect to login page)
      }
    });
  
    // Cleanup the observer when the component unmounts
    return () => unsubscribe();
  }, []);
  
  const handleCopyProfileUrl = () => {
    // Construct the profile URL using the coach's uid
    const profileUrl = `${window.location.origin}/coach/${coachProfile?.uid}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      // Provide feedback to the user
      toast({
        title: "Profile URL copied to clipboard.",
        description: "You can now share your public profile link!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }).catch(err => console.error('Failed to copy profile URL: ', err));
  };

  return (
    <Box 
        bg={cardBg} 
        boxShadow="sm" 
        borderRadius="lg" 
        p={[3, 4, 5]} // Responsive padding
        m={[3, 4, 5]}
        textAlign="center"
    >
      <VStack spacing={4}>
        {coachProfile && (
          <Image
            borderRadius="full"
            boxSize="150px"
            src={coachProfile.profilePicURL || 'fallback-image-url'} // Fallback URL if profilePicURL is not available
            alt="Coach Profile Image"
          />
        )}
        <Text fontWeight="bold">{coachProfile?.fullName || 'Coach Name'}</Text>
        <Text fontSize="sm" color="gray.500">{coachProfile?.expertise || 'Expertise Area'}</Text>
        <Text fontSize="sm">{coachProfile?.bio || 'Bio description...'}</Text>
        <HStack justify="center" mt={4}>
          <Button size="sm" colorScheme="blue">Edit Profile</Button>
          <Button size="sm" variant="outline" onClick={handleCopyProfileUrl}>Copy Public Profile Link</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CoachProfile;
