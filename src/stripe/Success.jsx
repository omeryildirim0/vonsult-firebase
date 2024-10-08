import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import useStoreAvailability from '../hooks/useStoreAvailability';

const functions = getFunctions();

const Success = () => {
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [meetingLink, setMeetingLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userDoc = JSON.parse(localStorage.getItem("user-info"));
  const { removeAvailability } = useStoreAvailability();

  const location = useLocation();
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const query = useQuery();
  const appointmentId = query.get('appointment_id');

  const processStartTimeISO = (startTimeISO, timezone) => {
    // Parse the ISO string to a Date object
    const startDateTime = new Date(startTimeISO);
  
    // Round down to the nearest hour for the start time
    startDateTime.setMinutes(0, 0, 0); // Reset minutes and seconds to zero
  
    // Format the date as 'YYYY-MM-DD'
    const date = startDateTime.toISOString().split('T')[0];
  
    // Format the start time as 'h:mm A', removing the leading zero if any
    const startTime = startDateTime.toLocaleTimeString('en-US', {
      hour: 'numeric', // 'numeric' will not add a leading zero
      minute: '2-digit',
      hour12: true
    });
  
    // Set the end time exactly one hour later
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60000); // Add 60 minutes to the start time
    const endTime = endDateTime.toLocaleTimeString('en-US', {
      hour: 'numeric', // 'numeric' will not add a leading zero
      minute: '2-digit',
      hour12: true
    });
  
    // Combine start time, end time, and the provided timezone to match the Firestore format
    const timeSlot = `${startTime} - ${endTime} (${timezone})`;
  
    console.log('Date:', date);
    console.log('Time slot:', timeSlot);
    return { date, timeSlot };
    
  };

  const fetchAppointmentDetails = async (appointmentId) => {
    setLoading(true);
    try {
      const docRef = doc(firestore, "appointments", appointmentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAppointmentDetails(docSnap.data());
      } else {
        console.log("No such document!");
        setError("Appointment not found.");
      }
    } catch (err) {
      console.error("Error fetching appointment details:", err);
      setError("Failed to fetch appointment details. Please try again.");
    }
  };

  const createMeeting = async (details) => {
    const createZoomMeeting = httpsCallable(functions, 'createZoomMeeting');
    try {
      const response = await createZoomMeeting(details);
      setMeetingLink(response.data.joinURL);
      console.log("Meeting created:", response.data);
      console.log("Meeting link:", response.data.joinURL);

      const { date, timeSlot } = processStartTimeISO(appointmentDetails.startTimeISO, appointmentDetails.coachTimeZone);
      

      // Call removeAvailability with the formatted date and slot.
      await removeAvailability(appointmentDetails.coachId, date, timeSlot);
      setLoading(false);
    } catch (err) {
      console.error("Error creating Zoom meeting:", err);
      setError("Failed to create meeting. Please try again.");
    }
  };

  useEffect(() => {
    setLoading(true);
    if (appointmentId) {
      fetchAppointmentDetails(appointmentId);
    } else {
      setError("No appointment ID provided.");
    }
  }, [appointmentId]);

  useEffect(() => {
    setLoading(true);
    const createIfDetailsPresent = async () => {
      // Check if appointmentDetails contains the necessary data
      if (appointmentDetails && appointmentDetails.startTimeISO) {
        await createMeeting({
          topic: "Vonsult Meeting",
          start_time: appointmentDetails.startTimeISO,
          duration: appointmentDetails.duration,
          timezone: appointmentDetails.timezone,
          userid: userDoc.uid,
          coachId: appointmentDetails.coachId,
          coachEmail: appointmentDetails.coachEmail,
          date: appointmentDetails.date,
          userEmail: userDoc.email,
          userTime: appointmentDetails.startTime,
          coachTimeZone: appointmentDetails.coachTimeZone,
          coachTimeSlot: appointmentDetails.coachTimeSlot,
          userTimeSlot: appointmentDetails.userTimeSlot, 
          coachName: appointmentDetails.coachName,
        });
      }
      
    };

    createIfDetailsPresent();
  }, [appointmentDetails]); // This useEffect depends on appointmentDetails

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading... Please wait.</div>;
  } else {
    return (
      <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#333' }}>Meeting Details</h1>
        {meetingLink && (
          <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
            <p>Meeting successfully created! Check your email for details.</p>
            <p>Meeting Link: <a href={meetingLink} style={{ color: '#0077cc' }} target="_blank" rel="noopener noreferrer">{meetingLink}</a></p>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }
  
};

export default Success;
