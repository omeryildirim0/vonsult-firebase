import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import axios from 'axios';
const functions = getFunctions();



const Success = () => {
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [error, setError] = useState('');
  
  const location = useLocation(); // Use the useLocation hook to access the query parameters

  // Function to parse the query parameters
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const appointmentId = query.get('appointment_id'); // Get the appointment_id from the URL

  // Function to fetch appointment details
  const fetchAppointmentDetails = async (appointmentId) => {
    try {
      const docRef = doc(firestore, "appointments", appointmentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAppointmentDetails(docSnap.data()); // Assuming the document contains the fields you need
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error("Error fetching appointment details:", err);
      setError("Failed to fetch appointment details. Please try again.");
    }
  };

  useEffect(() => {
    if (appointmentId) {
      fetchAppointmentDetails(appointmentId);
    }
  }, [appointmentId]);

  // Destructuring the variables from appointmentDetails
  const { date, startTime, startTimeISO, duration, timezone } = appointmentDetails;
  console.log("Appointment details:", appointmentDetails);

  // Function to call the createZoomMeeting Cloud Function with mock data
  const createMeeting = async () => {
    const createZoomMeeting = httpsCallable(functions, 'createZoomMeeting');
    try {
      // Example data to pass to the function
      const mockData = {
        topic: "Test Meeting",
        start_time: appointmentDetails.startTimeISO,
        duration: appointmentDetails.duration, // Duration in minutes
        timezone: appointmentDetails.timezone,
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