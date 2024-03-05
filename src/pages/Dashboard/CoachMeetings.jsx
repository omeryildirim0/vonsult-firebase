import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { Box, Heading, List, ListItem, Link, Text, VStack, Divider } from '@chakra-ui/react';
import moment from 'moment-timezone';

const CoachMeetings = ({ coachId }) => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const q = query(collection(firestore, "coaches", coachId, "meetings"));
      const querySnapshot = await getDocs(q);
      const meetingsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          meetingID: data.meetingID,
          start_time: data.start_time,
          joinURL: data.joinURL
          // Include other data fields as necessary
        };
      });
      setMeetings(meetingsData);
    };

    if (coachId) {
      fetchMeetings();
    }
  }, [coachId]);

  const formatMeetingTime = (time) => {
    const userTimezone = moment.tz.guess();
    return moment(time).tz(userTimezone).format('YYYY-MM-DD hh:mm A (z)');
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Scheduled Meetings</Heading>
      {meetings.length > 0 ? (
        <List spacing={3}>
          {meetings.map(meeting => (
            <ListItem key={meeting.id} p={3} shadow="md" borderWidth="1px" borderRadius="lg">
              <VStack align="start">
                <Text fontWeight="bold">Zoom Meeting ID: {meeting.meetingID}</Text>
                <Text>Start Time: {formatMeetingTime(meeting.start_time)}</Text>
                <Link href={meeting.joinURL} color="teal.500" isExternal>
                  Join URL
                </Link>
                {/* Render other meeting details here */}
              </VStack>
            </ListItem>
          ))}
        </List>
      ) : (
        <Text>No meetings found</Text>
      )}
    </Box>
  );
};

export default CoachMeetings;
