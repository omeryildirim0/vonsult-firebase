// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";
import { loadStripe } from '@stripe/stripe-js'; // Import Stripe library
import { getApp } from "@firebase/app";
import { getStripePayments } from "@invertase/firestore-stripe-payments";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhVSASvDdmYRCS-HbbNydjXPCJOvf_hvo",
  authDomain: "vonsult.firebaseapp.com",
  projectId: "vonsult",
  storageBucket: "vonsult.appspot.com",
  messagingSenderId: "913775115378",
  appId: "1:913775115378:web:11a0085a446cc7300c96eb",
  measurementId: "G-EPZ1DNCC5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "users",
});



export { app, auth, firestore, storage, payments, analytics};