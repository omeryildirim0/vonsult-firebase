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
} from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';

const AvailabilityCalendar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');

  const handleDayClick = (value, event) => {
    setSelectedDay(value);
    onOpen();
  };

  const saveAvailability = () => {
    const dateStr = selectedDay.toISOString().split('T')[0];
    const newAvailability = {
      date: dateStr,
      timeSlots: [{ start: startTime, end: endTime }]
    };
    
    setAvailabilities([...availabilities, newAvailability]);
    onClose();
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
          <ModalHeader>Select Timeframe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TimePicker
              onChange={setStartTime}
              value={startTime}
            />
            <TimePicker
              onChange={setEndTime}
              value={endTime}
            />
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
          <Box key={avail.date}>
            <Text fontWeight="bold">{avail.date}</Text>
            {avail.timeSlots.map((slot, index) => (
              <Text key={index}>{`${slot.start} - ${slot.end}`}</Text>
            ))}
          </Box>
        ))}
      </Box>
    </VStack>
  );
};

export default AvailabilityCalendar;
