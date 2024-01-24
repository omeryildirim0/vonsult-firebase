import { Box, Grid } from '@chakra-ui/react';
import CoachProfile from './CoachProfile'
import AvailabilityCalendar from './AvailabilityCalendar'

const CoachDashboard = () => {
  return (
    
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <Box as="section" colSpan={2}>
            <CoachProfile />
        </Box>
        <Box as="section" colSpan={3}>
            <AvailabilityCalendar />
        </Box>
  </Grid>
  )
}

export default CoachDashboard