// AvailabilityCalendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import {
  Box,
  VStack,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import useStoreAvailability from '../../hooks/useStoreAvailability';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase/firebase';
import 'react-calendar/dist/Calendar.css';




const TimeSlotSelector = ({ onSelectSlot }) => {
    // Generate time slots from 9 AM to 5 PM
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 9; hour <= 16; hour++) { // 4 PM is the last starting slot
        const startHour = hour === 12 ? 12 : hour % 12; // Convert 24h to 12h format
        const endHour = startHour + 1 > 12 ? 1 : startHour + 1;
        const startPeriod = hour >= 12 ? 'PM' : 'AM';
        const endPeriod = hour + 1 >= 12 ? 'PM' : 'AM';
  
        slots.push(`${startHour}:00 ${startPeriod} - ${endHour}:00 ${endPeriod}`);
      }
      return slots;
    };
  
    const timeSlots = generateTimeSlots();
  
    return (
      <VStack spacing={4}>
        {timeSlots.map((slot, index) => (
          <Button key={index} onClick={() => onSelectSlot(slot)} size="sm">
            {slot}
          </Button>
        ))}
      </VStack>
    );
  };

const AvailabilityCalendar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dailySlots, setDailySlots] = useState([]);
  const { isSaving, error, storeAvailability } = useStoreAvailability();
  const [authUser] = useAuthState(auth);
  const userDoc = JSON.parse(localStorage.getItem("user-info"));
  const coachId = userDoc.uid;


  const handleDayClick = (value, event) => {
    setSelectedDay(value);
    const existingSlots = availabilities.find(avail => avail.date === value.toISOString().split('T')[0]);
    setDailySlots(existingSlots ? existingSlots.timeSlots : []);
    onOpen();
  };

  const addTimeSlot = (slot) => {
    if (!dailySlots.includes(slot)) {
      setDailySlots([...dailySlots, slot]);
    }
  };

  const removeTimeSlot = (slot) => {
    setDailySlots(dailySlots.filter(s => s !== slot));
  };

  const saveAvailability = () => {
    const dateStr = selectedDay.toISOString().split('T')[0];
    setAvailabilities([...availabilities.filter(avail => avail.date !== dateStr), { date: dateStr, timeSlots: dailySlots }]);
    onClose();
  };

  const handleSave = () => {
    storeAvailability(coachId, availabilities);
  };

  return (
    <VStack>
      <Calendar
        onClickDay={handleDayClick}
        value={selectedDay}
        tileClassName={({ date, view }) => {
          if (availabilities.some(avail => avail.date === date.toISOString().split('T')[0])) {
            return 'highlight';
          }
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Time Slots</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TimeSlotSelector onSelectSlot={addTimeSlot} />
            <VStack spacing={4} align="stretch" mt={4}>
              {dailySlots.map((slot, index) => (
                <Tag size="lg" key={index} borderRadius="full">
                  <TagLabel>{slot}</TagLabel>
                  <TagCloseButton onClick={() => removeTimeSlot(slot)} />
                </Tag>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveAvailability}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box mt={4}>
        <Text fontSize="xl" mb={2}>Availabilities:</Text>
        {availabilities.map(avail => (
          <Box key={avail.date} p={2} border="1px solid" borderColor="gray.200" borderRadius="md">
            <Text fontWeight="bold">{avail.date}</Text>
            {avail.timeSlots.map((slot, index) => (
              <Tag size="md" key={index} borderRadius="full" m={1}>
                <TagLabel>{slot}</TagLabel>
                <TagCloseButton onClick={() => removeTimeSlot(slot)} />
              </Tag>
            ))}
          </Box>
        ))}
      </Box>
     
        <Button 
            onClick={handleSave} 
            isLoading={isSaving} 
            colorScheme="blue"
        >
            Save Availability
        </Button>
        {error && <p>Error saving data: {error.message}</p>}
    
    </VStack>
  );
};

export default AvailabilityCalendar;
