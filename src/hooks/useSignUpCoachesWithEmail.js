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
		if (!inputs.email || !inputs.password  || !inputs.fullName || !inputs.bio) {
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
				// Start by uploading the image to Firebase Storage if it exists
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
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "coaches", newUser.user.uid), userDoc);
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