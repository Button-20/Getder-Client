// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXf0fXHNKES_L8v-dNTz2LtPZgUnpSppQ",
  authDomain: "shockr-d186e.firebaseapp.com",
  projectId: "shockr-d186e",
  storageBucket: "shockr-d186e.appspot.com",
  messagingSenderId: "664394951146",
  appId: "1:664394951146:web:e8bf2ddd65d5192f802a93",
  measurementId: "G-WE7JYQ8J5J",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export default FIREBASE_AUTH;

// IOS: 843710926213-pgnspotntb2euno3fh3pkdkidaf56goe.apps.googleusercontent.com
// Android: 843710926213-stvmti2an0spicglkvpg05mtuhjs380e.apps.googleusercontent.com
