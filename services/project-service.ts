import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, firestore, storage } from "../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { nanoid } from "nanoid";

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

export async function deleteProject(projectId: string) {
  const _doc = doc(firestore, PROJECT_KEY, projectId);
  return await updateDoc(_doc, { status: "deleted" });
}
export async function updatedProjectStep(projectId: string, step: string) {
  const _doc = doc(firestore, PROJECT_KEY, projectId);
  return await updateDoc(_doc, { step });
}

export const useUserGetProject = (userId: any) => {
  return useCollectionData(
    userId
      ? query(
          projectCollection,
          where("userId", "==", userId),
          where("status", "in", ["active"])
        )
      : null
  );
};

export const useGetAllProject = () => {
  return useCollectionData(
    query(projectCollection, where("status", "in", ["active"]))
  );
};

export async function uploadProjectImg(id: string, file: File): Promise<any> {
  const assetsStorageRef = storageRef(
    storage,
    `project-imgs/${id}/${nanoid()}`
  );

  const {
    metadata: { name, fullPath },
    ref,
  } = await uploadBytes(assetsStorageRef, file);

  const downloadURL = await getDownloadURL(ref);

  return {
    name,
    fullPath,
    src: downloadURL,
    type: "img",
  };
}

export async function updateProjectImages(projectId: string, imagesData: any) {
  const _doc = doc(firestore, PROJECT_KEY, projectId);
  const projectSnapshot: any = await getDoc(_doc);
  const existingImagesData = projectSnapshot?.data().result_images || [];
  const updatedImagesData = [...existingImagesData, ...imagesData];
  return await updateDoc(_doc, { result_images: updatedImagesData });
}
