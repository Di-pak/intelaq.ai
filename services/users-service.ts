import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, firestore, storage } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const USERS_KEY = "users";
const usersCollection = collection(firestore, USERS_KEY);

export async function addUser(id: string, user: any) {
  const ref = doc(usersCollection, id);
  const res = await setDoc(ref, user);
  return res;
}

export async function getUser(id: string) {
  const querySnapshot = await getDoc(doc(firestore, USERS_KEY, id));
  const user = querySnapshot.data();
  return { ...user, id } as any;
}
