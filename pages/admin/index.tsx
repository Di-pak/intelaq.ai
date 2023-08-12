import React, { useEffect } from "react";
import AdminView from "./view";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { getUser } from "@/services/users-service";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";

function Admin() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    getUser(user?.uid as string)
      .then((res) => {
        if (res?.isAdmin) {
          router.push("/admin/view");
        } else {
          signOut(auth).finally(() => {
            router.push("/auth/login");
          });
        }
      })
      .catch(() => {
        router.push("/auth/login");
      });
  }, []);

  return null;
}

export default Admin;
