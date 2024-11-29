import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyAWcLeApRMBc68KSpvQAQYeR4eKNeffmpU",
  authDomain: "react-weatherapplication.firebaseapp.com",
  projectId: "react-weatherapplication",
  storageBucket: "react-weatherapplication.firebasestorage.app",
  messagingSenderId: "988080975886",
  appId: "1:988080975886:web:02529bbf105e0b6cd68c5f",
  measurementId: "G-P82C84YT23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
