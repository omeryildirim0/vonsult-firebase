import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appointmentId = queryParams.get('appointment_id');

  useEffect(() => {
    if (appointmentId) {
      const fetchAppointmentDetails = async () => {
        const appointmentRef = doc(firestore, 'appointments', appointmentId);
        const appointmentSnap = await getDoc(appointmentRef);

        if (appointmentSnap.exists()) {
          // Use these details to create Zoom meeting
          const appointmentDetails = appointmentSnap.data();
          console.log('Appointment details:', appointmentDetails);
          // ... code to create Zoom meeting
        } else {
          console.log('Appointment details not found');
        }
      };

      fetchAppointmentDetails();
    }
  }, [appointmentId]);
};

export default Success;
