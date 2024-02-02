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
    const time = timeSlot.split(' - ')[0]; // assuming timeSlot is "1:00 PM - 2:00 PM (EST)"
    const timeZone = timeSlot.match(/\(([^)]+)\)/)[1]; // This will extract "EST" from the time slot string
    const dateTime = moment.tz(`${date} ${time}`, "YYYY-MM-DD h:mm A", coachTimeZone || timeZone);
    return dateTime.tz(moment.tz.guess()).format('YYYY-MM-DD h:mm A z');
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
