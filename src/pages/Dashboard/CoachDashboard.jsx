import { Box, Grid, VStack } from '@chakra-ui/react';
import CoachProfile from './CoachProfile'
import AvailabilityCalendar from './AvailabilityCalendar'
import CoachMeetings from './CoachMeetings';


const CoachDashboard = () => {
  const userDoc = JSON.parse(localStorage.getItem("user-info"));
  const coachId = userDoc.uid; 

  return (
    
    <VStack spacing={8} w="full">
      <CoachProfile />
      <AvailabilityCalendar />
      <CoachMeetings coachId={coachId}/>
    </VStack>
  )
}

export default CoachDashboard