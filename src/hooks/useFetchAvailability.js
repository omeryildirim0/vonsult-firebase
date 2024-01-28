import { useState, useEffect } from 'react';
import { firestore } from '../firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

const useFetchAvailability = (coachId) => {
  const [fetchedAvailabilities, setFetchedAvailabilities] = useState([]);
  const [isLoadingAvailabilities, setIsLoadingAvailabilities] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoadingAvailabilities(true);
      try {
        const q = query(collection(firestore, 'coaches', coachId, 'availability'));
        const querySnapshot = await getDocs(q);
        const availabilities = [];
        querySnapshot.forEach((doc) => {
          availabilities.push({ id: doc.id, ...doc.data() });
        });
        setFetchedAvailabilities(availabilities);
      } catch (err) {
        setFetchError(err);
      } finally {
        setIsLoadingAvailabilities(false);
      }
    };

    if (coachId) {
      fetchAvailability();
    }
  }, [coachId]);

  return { fetchedAvailabilities, isLoadingAvailabilities, fetchError };
};

export default useFetchAvailability;
