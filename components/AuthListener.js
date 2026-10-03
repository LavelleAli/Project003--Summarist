'use client'

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getPremiumStatus } from "@/firebase/firebase";
import { setUser, clearUser, setPremium } from "@/redux/slices/auth";

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
        // Check the subscription once here; components read it from Redux.
        getPremiumStatus()
          .then((status) => dispatch(setPremium(status)))
          .catch((error) => {
            console.log("Could not load subscription status", error);
            dispatch(setPremium(false));
          });
      } else {
        dispatch(clearUser());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return null;
}
