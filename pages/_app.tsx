import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { logout } from "@/services/auth";
import { getUser } from "@/services/users-service";

export default function App({ Component, pageProps }: AppProps) {
  const [user, userIsLoading, userError] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, [user, userIsLoading]);

  if (userIsLoading) return null;

  return <Component {...pageProps} />;

  async function checkUserLoggedIn() {
    console.log("useEffect");
    if (!user && userIsLoading) {
      return;
    }
    if (!user && router.pathname !== "/auth/login") {
      router.replace("/auth/login");
    }
    if (
      user &&
      (router.pathname === "/auth/login" ||
        router.pathname === "/auth/register")
    ) {
      router.push("/brand");
    }
  }
}
