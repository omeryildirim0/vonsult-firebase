import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import axios from 'axios';
const functions = getFunctions();



const Success = () => {
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [error, setError] = useState('');

  // Function to call the createZoomMeeting Cloud Function with mock data
  const createMeeting = async () => {
    const createZoomMeeting = httpsCallable(functions, 'createZoomMeeting');
    try {
      // Example data to pass to the function
      const mockData = {
        topic: "Test Meeting",
        start_time: "2024-03-01T10:00:00Z",
        duration: 30, // Duration in minutes
      };
      
      const response = await createZoomMeeting(mockData);
      setMeetingDetails(response.data); // Store meeting details in state
      setMeetingLink(response.data.join_url); // Extract and store the meeting link
      console.log("Meeting created:", response.data);
    } catch (err) {
      console.error("Error creating Zoom meeting:", err);
      setError("Failed to create meeting. Please try again.");
    }
  };

  useEffect(() => {
    // Any initial setup can go here
  }, []);

  return (
    <div>
      <h1>Meeting Creation Success</h1>
      {meetingLink && (
        <div>
          <p>Meeting successfully created!</p>
          <p>Meeting Link: <a href={meetingLink} target="_blank" rel="noopener noreferrer">{meetingLink}</a></p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={createMeeting}>Create Zoom Meeting</button>
    </div>
  );
};

export default Success;