//use signup coaches with email and password
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";

const useSignUpWithEmailAndPassword = () => {
	const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
	const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);
    const navigate = useNavigate();

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
				
				// Create products for the coach in the 'products' collection
				const products = [
					{
						title: `${inputs.fullName}'s 30-minute Coaching Session`,
						description: 'A short, focused coaching session.',
						price: (inputs.hourlyRate / 2) * 100, // Assuming hourlyRate is provided as a whole dollar amount
						length: 30, // 30 minutes session
						coachId: newUser.user.uid,
						createdAt: Date.now(),
					},
					{
						title: `${inputs.fullName}'s 60-minute Coaching Session`,
						description: 'A full-length coaching session for in-depth guidance.',
						price: inputs.hourlyRate * 100, // Assuming hourlyRate is provided as a whole dollar amount
						length: 60, // 60 minutes session
						coachId: newUser.user.uid,
						createdAt: Date.now(),
					}
				];
	
				// Loop through the products array to create each product
				for (const product of products) {
					await setDoc(doc(firestore, "products", `${newUser.user.uid}-${product.length}`), product);
				}
	
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