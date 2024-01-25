import { useState } from 'react';
import { firestore } from "../firebase/firebase";
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const useStoreAvailability = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const storeAvailability = async (coachId, newAvailability) => {
    setIsSaving(true);
    try {
      const coachRef = doc(firestore, 'coaches', coachId);
      const availabilityToAdd = Array.isArray(newAvailability) ? newAvailability : [newAvailability];
      await updateDoc(coachRef, { availability: arrayUnion(...availabilityToAdd) });
      setIsSaving(false);
    } catch (err) {
      setError(err);
      setIsSaving(false);
    }
  };

  return { isSaving, error, storeAvailability };
};

export default useStoreAvailability;
