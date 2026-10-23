'use client'

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, watchPremiumStatus } from "@/firebase/firebase";
import { setUser, clearUser, setPremium } from "@/redux/slices/auth";

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    let stopWatchingPremium = () => {};

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Stop listening to the previous user's subscription before anything else
      stopWatchingPremium();
      stopWatchingPremium = () => {};

      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
        // Keep listening so components see the new status as soon as a checkout completes.
        stopWatchingPremium = watchPremiumStatus(
          user.uid,
          (status) => dispatch(setPremium(status)),
          (error) => {
            console.log("Could not load subscription status", error);
            dispatch(setPremium(false));
          },
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => {
      stopWatchingPremium();
      unsubscribe();
    };
  }, [dispatch]);

  return null;
}
