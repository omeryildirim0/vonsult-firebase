import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const auth = getAuth();
const firestore = getFirestore();

const checkUserCollection = async () => {
  const user = auth.currentUser;

  if (user) {
    // Check for documents in both collections to determine the user's role
    const userDoc = await firestore.collection("users").doc(user.uid).get();
    const coachDoc = await firestore.collection("coaches").doc(user.uid).get();

    const isUser = userDoc.exists;
    const isCoach = coachDoc.exists;

    console.log("User is a user:", isUser);
    console.log("User is a coach:", isCoach);

    // Use this information to render the appropriate dashboard or features
  }
};
