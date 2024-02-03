import { useState, useEffect } from 'react';
import { firestore } from '../firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import moment from 'moment-timezone';

const useFetchAvailability = (coachId) => {
  const [fetchedAvailabilities, setFetchedAvailabilities] = useState([]);
  const [isLoadingAvailabilities, setIsLoadingAvailabilities] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // This function will convert a time slot to the user's local timezone
  const convertToUserTimeZone = (date, timeSlot, coachTimeZone) => {
    // Remove timezone information from the timeSlot (e.g., removing "(EST)")
    const cleanedTimeSlot = timeSlot.replace(/\s*\([^)]+\)/, '');
    //console.log(cleanedTimeSlot); // This will log "1:00 PM - 2:00 PM"
  
    const timeZone = timeSlot.match(/\(([^)]+)\)/)[1]; // This will extract "EST" from the time slot string
  
    // Assuming you want to convert the start and end times separately
    const times = cleanedTimeSlot.split(' - ');
    const startTime = moment.tz(`${date} ${times[0]}`, "YYYY-MM-DD h:mm A", timeZone);
    const endTime = moment.tz(`${date} ${times[1]}`, "YYYY-MM-DD h:mm A", timeZone);
  
    // Convert both start and end times to the user's timezone and format them
    const convertedStartTime = startTime.tz(moment.tz.guess()).format('h:mm A');
    const convertedEndTime = endTime.tz(moment.tz.guess()).format('h:mm A (z)');
  
    // Return the converted time slot in the user's timezone
    return `${convertedStartTime} - ${convertedEndTime}`;
    
  };
  

  const fetchAvailability = async () => {
    setIsLoadingAvailabilities(true);
    setFetchError(null);
    try {
      const q = query(collection(firestore, 'coaches', coachId, 'availability'));
      const querySnapshot = await getDocs(q);
      const availabilities = [];
      querySnapshot.forEach((doc) => {
        const date = doc.id;
        const coachTimeZone = doc.data().timeZone; // Assume you store coach's timezone in the document
        const localSlots = doc.data().timeSlots.map((timeSlot) => {
          return convertToUserTimeZone(date, timeSlot, coachTimeZone); // Convert each time slot to user's local timezone
        });
        availabilities.push({ id: date, timeSlots: localSlots });
      });
      setFetchedAvailabilities(availabilities);
    } catch (err) {
      setFetchError(err);
    } finally {
      setIsLoadingAvailabilities(false);
    }
  };

  useEffect(() => {
    if (coachId) {
      fetchAvailability();
    }
  }, [coachId]);

  return { fetchedAvailabilities, isLoadingAvailabilities, fetchError, refetch: fetchAvailability };
};

export default useFetchAvailability;
