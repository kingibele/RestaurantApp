// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"; 
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyChW9yqoJ2PHAZPEetLst-3VXKBb6wc-BM",
  authDomain: "restaurant-5c7d1.firebaseapp.com",
  projectId: "restaurant-5c7d1",
  storageBucket: "restaurant-5c7d1.appspot.com",
  messagingSenderId: "249429049549",
  appId: "1:249429049549:web:a8496bb612b4c09416e984"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


export { auth, app };

// initialize Firestore
export const db = getFirestore(app);
