import { useState } from 'react';
import { firestore } from "../firebase/firebase";
import { doc, setDoc, getDoc, arrayUnion, updateDoc, arrayRemove } from 'firebase/firestore';

const useStoreAvailability = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const storeAvailability = async (coachId, newAvailability) => {
    setIsSaving(true);
    try {
      for (const availability of newAvailability) {
        const dateFormatted = availability.date;
        const slotRef = doc(firestore, 'coaches', coachId, 'availability', dateFormatted);
  
        const docSnap = await getDoc(slotRef);
  
        if (docSnap.exists()) {
          // Document exists, use setDoc with merge option to add new time slots
          await setDoc(slotRef, {
            timeSlots: arrayUnion(availability.slot)
          }, { merge: true });
        } else {
          // Document does not exist, create it with the initial time slot
          await setDoc(slotRef, {
            timeSlots: [availability.slot]
          });
        }
      }
      setIsSaving(false);
    } catch (err) {
      setError(err);
      setIsSaving(false);
    }
  };
  
  const removeAvailability = async (coachId, date, slotToRemove) => {
    setIsSaving(true);
    setError(null);
    try {
      const slotRef = doc(firestore, 'coaches', coachId, 'availability', date);
      // Use Firestore's arrayRemove to remove the slot
      await updateDoc(slotRef, {
        timeSlots: arrayRemove(slotToRemove)
      });
      setIsSaving(false);
    } catch (err) {
      setError(err);
      setIsSaving(false);
    }
  };

  return { isSaving, error, storeAvailability, removeAvailability};
};

export default useStoreAvailability;