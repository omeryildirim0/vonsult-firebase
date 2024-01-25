import { useState } from 'react';
import { firestore } from "../firebase/firebase";
import { doc, updateDoc } from 'firebase/firestore';

const useStoreAvailability = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const storeAvailability = async (coachId, availability) => {
    setIsSaving(true);
    try {
      const coachRef = doc(firestore, 'coaches', coachId);
      await updateDoc(coachRef, { availability });
      setIsSaving(false);
    } catch (err) {
      setError(err);
      setIsSaving(false);
    }
  };

  return { isSaving, error, storeAvailability };
};

export default useStoreAvailability;
