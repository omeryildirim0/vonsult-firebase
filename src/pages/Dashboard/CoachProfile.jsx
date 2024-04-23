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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel, 
  Textarea,
} from '@chakra-ui/react';
import { auth, firestore } from '../../firebase/firebase'; // ensure you have the correct path
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditProfileModal = ({ isOpen, onClose, initialRef, finalRef, coachProfile, updateCoachProfile }) => {
  const [localProfile, setLocalProfile] = React.useState({
    fullName: '',
    bio: '',
    // Add other fields that you need to edit
  });

  React.useEffect(() => {
    // Update the local state whenever the coachProfile prop updates
    if (coachProfile) {
      setLocalProfile(coachProfile);
    }
  }, [coachProfile]);

  const handleChange = (e) => {
    setLocalProfile({
      ...localProfile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Function to update the profile
    updateCoachProfile(localProfile);
    onClose(); // Close the modal
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input ref={initialRef} placeholder="Full Name" name="fullName" value={localProfile.fullName} onChange={handleChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bio</FormLabel>
              <Textarea
                placeholder="Bio"
                name="bio"
                value={localProfile.bio || ''}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};


const CoachProfile = () => {
  const [coachProfile, setCoachProfile] = useState(null);
  const cardBg = useColorModeValue('white', 'gray.700'); // Adjusts color based on theme
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const updateCoachProfile = async (updatedProfile) => {
    // Make sure the user is still logged in
    const user = auth.currentUser;
    if (user) {
      // Reference the document for the current user
      const docRef = doc(firestore, "coaches", user.uid);

      // Update the document
      try {
        await updateDoc(docRef, updatedProfile);
        // If the update is successful, you might want to update the local state
        setCoachProfile(updatedProfile);
        
        // Provide some feedback to the user, like a toast
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        // Handle any errors in the update process
        console.error("Error updating document: ", error);
        // Provide error feedback to the user
        toast({
          title: "Error",
          description: "There was an error updating your profile.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      // Handle the case where the user is not logged in
      console.log("User not logged in");
      // Maybe redirect to login page or show a message
    }
  };


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
          <Button size="sm" colorScheme="blue" onClick={onOpen}>Edit Profile</Button>
          <Button size="sm" variant="outline" onClick={handleCopyProfileUrl}>Copy Public Profile Link</Button>
          <EditProfileModal
            isOpen={isOpen}
            onClose={onClose}
            initialRef={initialRef}
            finalRef={finalRef}
            coachProfile={coachProfile}
            updateCoachProfile={updateCoachProfile}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default CoachProfile;
