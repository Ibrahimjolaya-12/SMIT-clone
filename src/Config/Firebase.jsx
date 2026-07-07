// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";  // custom ye code khud kia ha
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYSKkfQVN2li7G77QKMLOTb7S0C7ujCxQ",
  authDomain: "smit-portal-2.firebaseapp.com",
  projectId: "smit-portal-2",
  storageBucket: "smit-portal-2.firebasestorage.app",
  messagingSenderId: "894829145081",
  appId: "1:894829145081:web:1718ada51bdcfb0f966b28",
  measurementId: "G-DHYE8EJG2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// custom ye code khud kia ha
const auth = getAuth(app)
export {auth , analytics}