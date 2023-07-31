// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import * as firebaseConfig from "./firebase.json";
import { getFunctions } from "firebase/functions";
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export default app;
