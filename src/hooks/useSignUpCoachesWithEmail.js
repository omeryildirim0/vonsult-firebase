//use signup coaches with email and password
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";

const useSignUpWithEmailAndPassword = () => {
	const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
	const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);
    const navigate = useNavigate();
	const functions = getFunctions();
	const createStripeProduct = httpsCallable(functions, 'createStripeProduct');

	const signup = async (inputs) => {
		if (!inputs.email || !inputs.password || !inputs.fullName || !inputs.bio || !inputs.hourlyRate) {
			showToast("Error", "Please fill all the fields", "error");
			return;
		}
	
		try {
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}
			if (newUser) {
				let profilePicURL = "";
				if (inputs.profileImage) {
					const imageRef = ref(storage, `profilePictures/${newUser.user.uid}`);
					const snapshot = await uploadBytes(imageRef, inputs.profileImage);
					profilePicURL = await getDownloadURL(snapshot.ref);
				}
				
				const userDoc = {
					uid: newUser.user.uid,
					email: inputs.email,
					fullName: inputs.fullName,
					bio: inputs.bio,
					userType: "coach",
					profilePicURL: profilePicURL,
					hourlyRate: inputs.hourlyRate,
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "coaches", newUser.user.uid), userDoc);
				
				createStripeProduct({ fullName: userDoc.fullName, bio: userDoc.bio, hourlyRate: userDoc.hourlyRate })
					.then((result) => {
						// Read result of the Cloud Function.
						// console.log({ productId: result.data.productId, priceId: result.data.priceId });
					})
					.catch((error) => {
						// Getting the Error details.
						const code = error.code;
						const message = error.message;
						const details = error.details;
						// console.error({ code, message, details });
						
				});
	
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
				navigate('/');
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};
	

	return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;