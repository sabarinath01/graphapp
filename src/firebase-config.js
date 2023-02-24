// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnjwIbE2nsKGDfmf8EfCSa7akE7uoMR_Y",
  authDomain: "tempfb-db081.firebaseapp.com",
  projectId: "tempfb-db081",
  storageBucket: "tempfb-db081.appspot.com",
  messagingSenderId: "745557531382",
  appId: "1:745557531382:web:6f0fde5624aa1546cfaad7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
