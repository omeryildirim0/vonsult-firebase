import React from 'react'
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { Box, Heading, List, ListItem, Link, Text, VStack, Divider } from '@chakra-ui/react';
import moment from 'moment-timezone';

const userDoc = JSON.parse(localStorage.getItem("user-info"));
const userId = userDoc.uid;

const UserDashboard = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const q = query(collection(firestore, "users", userId, "meetings"));
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

    fetchMeetings();
  }, []);

  const formatMeetingTime = (time) => {
    const localTime = moment(time).tz(moment.tz.guess());
    return `${localTime.format('YYYY-MM-DD HH:mm')} (${localTime.format('z')})`;
  };


  return (
    <Box p={5}>
      <Heading mb={4}>User Dashboard</Heading>
      {meetings.length > 0 ? (
        <List spacing={3}>
          {meetings.map(meeting => (
            <ListItem key={meeting.id} p={3} shadow="md" borderWidth="1px" borderRadius="lg">
              <VStack align="start">
                <Text fontWeight="bold">Meeting ID: {meeting.meetingID}</Text>
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

export default UserDashboard;