// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtAveuL9J1rUl0I2rbyigaUJgc7Z_tVd0",
  authDomain: "alforqan-absents.firebaseapp.com",
  projectId: "alforqan-absents",
  storageBucket: "alforqan-absents.appspot.com",
  messagingSenderId: "211607081371",
  appId: "1:211607081371:web:7b6f918d3f0df2443a913e",
  measurementId: "G-NKQCKSLE3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
