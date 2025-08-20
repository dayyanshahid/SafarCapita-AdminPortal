// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBj1fZlx_wvNErVzJ2GhyPhSFSpc--myoE",
  authDomain: "safar-capital-ae106.firebaseapp.com",
  projectId: "safar-capital-ae106",
  storageBucket: "safar-capital-ae106.firebasestorage.app",
  messagingSenderId: "117579506105",
  appId: "1:117579506105:web:fa8cdfbd86c5f3850ed668",
  measurementId: "G-SW1T9FDDSJ",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
// console.log("Firebase App initialized:", app.name);

let messaging;

if (typeof window !== "undefined" && "Notification" in window) {
  try {
    messaging = getMessaging(app);
    console.log("Firebase Messaging initialized successfully");
  } catch (error) {
    console.error("Error initializing Firebase Messaging:", error);
  }

  // Register service worker safely
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("SW registered successfully:");
        // console.log("SW registered successfully:", registration.scope);
      })
      .catch((err) => {
        console.error("SW registration failed:", err);
      });
  } else {
    console.warn("ServiceWorker is not supported in this browser");
  }
} else {
  console.warn(
    "Window or Notification API not available - running in SSR or unsupported browser"
  );
}

export { messaging, onMessage, getToken };
