// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJemC2Qf79ntaTCT_a99HMlNdOxjTTUPw",
  authDomain: "tracerai.firebaseapp.com",
  projectId: "tracerai",
  storageBucket: "tracerai.firebasestorage.app",
  messagingSenderId: "279941343694",
  appId: "1:279941343694:web:4475f96a2675cd6468639f",
  measurementId: "G-SRXT18D84G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
