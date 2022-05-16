// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnPyVLl8q2L5xE90RzUs9U5aXIl1HmiLo",
  authDomain: "notes-app-a06c9.firebaseapp.com",
  projectId: "notes-app-a06c9",
  storageBucket: "notes-app-a06c9.appspot.com",
  messagingSenderId: "665558322266",
  appId: "1:665558322266:web:87a34d21c3875a83f55c63"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();
 