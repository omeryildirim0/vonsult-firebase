import { useState } from 'react';
import { firestore } from "../firebase/firebase";
import { doc, setDoc } from 'firebase/firestore';

const useStoreAvailability = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const storeAvailability = async (coachId, newAvailability) => {
    setIsSaving(true);
    try {
      // Loop through each availability slot to store it
      for (const slot of newAvailability) {
        // Use the date as the document ID within the `availability` subcollection
        const dateFormatted = slot.date; // Assuming slot.date is in 'YYYY-MM-DD' format
        const slotRef = doc(firestore, 'coaches', coachId, 'availability', dateFormatted);
        
        // You may want to structure the document with more data, for example:
        // const slotData = { times: slot.times }; // Assuming slot.times contains the time slots
        
        // Set the document with the specified date as ID
        await setDoc(slotRef, slot); // Replace `slot` with `slotData` if using the structured format
      }
      setIsSaving(false);
    } catch (err) {
      setError(err);
      setIsSaving(false);
    }
  };

  return { isSaving, error, storeAvailability };
};

export default useStoreAvailability;
