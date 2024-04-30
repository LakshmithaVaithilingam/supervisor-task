// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqziIhsSwl6mSdTa2fn3vdsXz3NCed4Js",
  authDomain: "task-management-ee05c.firebaseapp.com",
  projectId: "task-management-ee05c",
  storageBucket: "task-management-ee05c.appspot.com",
  messagingSenderId: "722173948554",
  appId: "1:722173948554:web:afd2579c66e6cd14d5f373",
  measurementId: "G-40ZT2VMHKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);