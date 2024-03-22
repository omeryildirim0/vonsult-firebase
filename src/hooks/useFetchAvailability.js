import { useState, useEffect } from 'react';
import { firestore } from '../firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import moment from 'moment-timezone';

const useFetchAvailability = (coachId) => {
  const [fetchedAvailabilities, setFetchedAvailabilities] = useState([]);
  const [isLoadingAvailabilities, setIsLoadingAvailabilities] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // This function will convert a time slot to the user's local timezone
  const convertToUserTimeZone = (date, timeSlot) => {
    // Extract the time zone identifier from the time slot string
    const timeZoneMatch = timeSlot.match(/\(([^)]+)\)/);
    const coachTimeZone = timeZoneMatch ? timeZoneMatch[1] : null;
    
    // If we couldn't find a time zone, we return the original time slot without conversion
    if (!coachTimeZone) {
      return timeSlot;
    }
  
    // Remove the time zone information from the time slot
    const cleanedTimeSlot = timeSlot.replace(/\s*\([^)]+\)/, '');
    
    // Parse the start and end times separately using the coach's time zone
    const [startTimeString, endTimeString] = cleanedTimeSlot.split(' - ');
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    

    // Convert the start and end times to the user's local timezone
    const startTime = moment.tz(`${date} ${startTimeString}`, "YYYY-MM-DD h:mm A", coachTimeZone);
    const endTime = moment.tz(`${date} ${endTimeString}`, "YYYY-MM-DD h:mm A", coachTimeZone);
  
    const convertedStartTime = startTime.tz(userTimeZone).format('h:mm A');
    const convertedEndTime = endTime.tz(userTimeZone).format('h:mm A');
    
    // Return the converted time slot in the user's timezone
    return `${convertedStartTime} - ${convertedEndTime} (${userTimeZone})`;
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
          return convertToUserTimeZone(date, timeSlot); // Convert each time slot to user's local timezone
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
