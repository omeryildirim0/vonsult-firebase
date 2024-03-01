import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();

const Success = () => {
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [meetingLink, setMeetingLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userDoc = JSON.parse(localStorage.getItem("user-info"));

  const location = useLocation();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const appointmentId = query.get('appointment_id');

  const fetchAppointmentDetails = async (appointmentId) => {
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
      
    } catch (err) {
      console.error("Error creating Zoom meeting:", err);
      setError("Failed to create meeting. Please try again.");
    }
  };

  useEffect(() => {
    if (appointmentId) {
      fetchAppointmentDetails(appointmentId);
    } else {
      setLoading(false);
      setError("No appointment ID provided.");
    }
  }, [appointmentId]);

  useEffect(() => {
    const createIfDetailsPresent = async () => {
      // Check if appointmentDetails contains the necessary data
      if (appointmentDetails && appointmentDetails.startTimeISO) {
        await createMeeting({
          topic: "Vonsult Meeting",
          start_time: appointmentDetails.startTimeISO,
          duration: appointmentDetails.duration,
          timezone: appointmentDetails.timezone,
          userid: userDoc.uid,
        });
      }
      setLoading(false);
    };

    createIfDetailsPresent();
  }, [appointmentDetails]); // This useEffect depends on appointmentDetails

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Meeting Details</h1>
        {meetingLink && (
          <div>
            <p>Meeting successfully created!</p>
            <p>Meeting Link: <a href={meetingLink} target="_blank" rel="noopener noreferrer">{meetingLink}</a></p>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }
};

export default Success;
