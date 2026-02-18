import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBTYGK9h7PfagzugAO2aFjOpnP8h0e-KSM",
    authDomain: "mindbridge-navigator-project.firebaseapp.com",
    projectId: "mindbridge-navigator-project",
    storageBucket: "mindbridge-navigator-project.firebasestorage.app",
    messagingSenderId: "434966387516",
    appId: "1:434966387516:web:d35c529e720fdce42d1c39",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
