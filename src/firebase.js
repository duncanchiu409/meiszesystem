// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";
import 'firebase/storage'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHacRQbNN5sWZjiODjqr2CCId90jRWIOM",
  authDomain: "meiszesystem.firebaseapp.com",
  databaseURL: "https://meiszesystem-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "meiszesystem",
  storageBucket: "meiszesystem.appspot.com",
  messagingSenderId: "884785924722",
  appId: "1:884785924722:web:97703d77eb6eea5e2410eb",
  measurementId: "G-GW4CES6QCH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//export const db = getFirestore(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const database = getFirestore(app);