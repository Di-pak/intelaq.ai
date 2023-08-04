import {
  addDoc,
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

export const BRAND_KEY = "brands";
const brandCollection = collection(firestore, BRAND_KEY);

export async function uploadBrandLogo(file: any, id: string) {
  const usersStorageRef = storageRef(storage, `brand-imgs/${id}/logo`);
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

export async function addBrand(id: string, brand: any) {
  const _doc = doc(firestore, BRAND_KEY + "/" + id);
  const res = await setDoc(_doc, brand);
  return res;
}

export async function getAllBrands() {
  const querySnapshot = await getDocs(brandCollection);
  const listings = querySnapshot.docs.map((x) => ({ id: x.id, ...x.data() }));
  return listings;
}

export async function getBrand(id: string) {
  console.log("getBrand id", id);
  const querySnapshot = await getDoc(doc(firestore, BRAND_KEY, id));
  const brand = querySnapshot.data();
  return { ...brand };
}

export async function updateBrand(id: string, brand: any) {
  const ref = doc(brandCollection, id);
  const res = await updateDoc(ref, brand);
  return res;
}

export const useUserGetBrands = (userId: any) => {
  return useCollectionData(
    userId
      ? query(
          brandCollection,
          where("userId", "==", userId),
          where("status", "in", ["active"])
        )
      : null
  );
};

export async function deleteBrand(brandId: string) {
  const _doc = doc(firestore, BRAND_KEY, brandId);
  return await updateDoc(_doc, { status: "deleted" });
}
