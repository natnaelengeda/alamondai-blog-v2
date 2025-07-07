"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getFirestore, } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Prevent reinitialization
const firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Init services
const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

// Connect emulators in development only
// if (process.env.NEXT_PUBLIC_USE_EMULATOR === "true") {
//   connectAuthEmulator(auth, "http://localhost:9099");
//   connectFirestoreEmulator(firestore, "localhost", 8080);
// }

// Optional Analytics (browser-only)
let analytics: ReturnType<typeof getAnalytics> | undefined;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(firebase);
      console.log("✅ Firebase Analytics initialized");
    } else {
      console.log("⚠️ Firebase Analytics not supported");
    }
  });
}

export { firebase, analytics, auth, firestore };
