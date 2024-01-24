import { Box, Grid, VStack } from '@chakra-ui/react';
import CoachProfile from './CoachProfile'
import AvailabilityCalendar from './AvailabilityCalendar'

const CoachDashboard = () => {
  return (
    
    <VStack spacing={8}>
       <CoachProfile />
        <AvailabilityCalendar />
      
  </VStack>
  )
}

export default CoachDashboard