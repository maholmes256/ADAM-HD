// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhTh60Cz0NjWSZVxjq4CccBdw3QnAQoxY",
  authDomain: "number-raiders-ebc61.firebaseapp.com",
  projectId: "number-raiders-ebc61",
  storageBucket: "number-raiders-ebc61.firebasestorage.app",
  messagingSenderId: "294092893976",
  appId: "1:294092893976:web:3094685831d09947e6b86d",
  measurementId: "G-9BS91LW4PF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
