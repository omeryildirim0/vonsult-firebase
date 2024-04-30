import { useState } from 'react';
import { firestore } from "../firebase/firebase";
import { doc, updateDoc, arrayUnion, getFirestore, setDoc } from 'firebase/firestore';

const useAddEmailToNewsletter = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const addEmailToNewsletter = async (email) => {
    const newsletterDocRef = doc(firestore, 'newsletterList', 'emailsList'); // Fixed document reference
    
    setIsSaving(true);
    try {
      await updateDoc(newsletterDocRef, {
        emails: arrayUnion(email) // Update the 'emails' array field
      });
      // console.log("Email added successfully!");
      setIsSaving(false);
      return true;
    } catch (error) {
      console.error("Error adding email to Firestore: ", error);
      setError(error);
      setIsSaving(false);
      return false;
    }
  };

  return { addEmailToNewsletter, isSaving, error };
};

export default useAddEmailToNewsletter;
