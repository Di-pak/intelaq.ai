import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore, storage } from "../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export const PROJECT_KEY = "projects";
const projectCollection = collection(firestore, PROJECT_KEY);

export async function uploadProjectImage(file: any, id: string) {
  const usersStorageRef = storageRef(storage, `project-imgs/${id}/image`);
  const {
    metadata: { name, fullPath },
    ref,
  } = await uploadBytes(usersStorageRef, file);
  const downloadURL = await getDownloadURL(ref);
  return {
    name,
    fullPath,
    src: downloadURL,
  };
}

export async function addProject(id: string, project: any) {
  const _doc = doc(firestore, PROJECT_KEY + "/" + id);
  const res = await setDoc(_doc, project);
  return res;
}

export async function getAllProject() {
  const querySnapshot = await getDocs(projectCollection);
  const listings = querySnapshot.docs.map((x) => ({ id: x.id, ...x.data() }));
  return listings;
}

export async function getProject(id: string) {
  const querySnapshot = await getDoc(doc(firestore, PROJECT_KEY, id));
  const brand = querySnapshot.data();
  return { ...brand };
}

export async function updateProject(id: string, brand: any) {
  const ref = doc(projectCollection, id);
  const res = await updateDoc(ref, brand);
  return res;
}
