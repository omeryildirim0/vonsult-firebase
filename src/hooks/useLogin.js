import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useLogin = () => {
	const showToast = useShowToast();
	const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
	const loginUser = useAuthStore((state) => state.login);

	const login = async (inputs) => {
		if (!inputs.email || !inputs.password) {
			return showToast("Error", "Please fill all the fields", "error");
		}
		try {
			const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

			if (userCred) {
				// Check if the user is in the 'users' collection
				const userDocRef = doc(firestore, "users", userCred.user.uid);
				const userDocSnap = await getDoc(userDocRef);
	
				if (userDocSnap.exists()) {
					// User is a regular user
					localStorage.setItem("user-info", JSON.stringify(userDocSnap.data()));
					loginUser(userDocSnap.data());
				} else {
					// If not in 'users', check 'coaches'
					const coachDocRef = doc(firestore, "coaches", userCred.user.uid);
					const coachDocSnap = await getDoc(coachDocRef);
	
					if (coachDocSnap.exists()) {
						// User is a coach
						localStorage.setItem("user-info", JSON.stringify(coachDocSnap.data()));
						loginUser(coachDocSnap.data());
					} else {
						// Handle case where user is neither in 'users' nor 'coaches'
						showToast("Error", "User not found in any category", "error");
					}
				}
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { loading, error, login };
};

export default useLogin;