// Import the functions you need from the SDKs you need

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn1Afz2gHMK9vI-oZaPelEk9jdWbgvgtA",
  authDomain: "expence-tracker-e9338.firebaseapp.com",
  projectId: "expence-tracker-e9338",
  storageBucket: "expence-tracker-e9338.appspot.com",
  messagingSenderId: "452151844306",
  appId: "1:452151844306:web:b05be9dcf83ef6d082fc0b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
