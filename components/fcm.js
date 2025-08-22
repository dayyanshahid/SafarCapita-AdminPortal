"use client";

import { useEffect, useState } from "react";
import { messaging, getToken, onMessage } from "../lib/firebase/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FCM = () => {
  const [progressBackground, setProgressBackground] = useState(
    "linear-gradient(to right, #4F46E5, #3B82F6)"
  );

  // Debug state changes
  useEffect(() => {
    console.log("Progress background updated:");
    // console.log("Progress background updated:", progressBackground);
  }, [progressBackground]);

  useEffect(() => {
    if (!messaging) {
      console.warn("FCM: Messaging not initialized");
      return;
    }

    const registerServiceWorkerAndGetToken = async () => {
      try {
        console.log("FCM: Registering service worker...");
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );

        // ✅ Wait until the service worker is fully activated
        if (!registration.active) {
          await new Promise((resolve) => {
            const interval = setInterval(() => {
              if (registration.active) {
                clearInterval(interval);
                resolve();
              }
            }, 100);
          });
        }

        const currentToken = await getToken(messaging, {
          vapidKey:
            "BPdoY0yaAoYolHzwBh3-yW_VsRluyemdfdkGoccLRBUQJ4YQbR4lzgW3Hh3i-z1FxjQ3WZW1TgT2eE4QGTbYUik",
          serviceWorkerRegistration: registration,
        });

        if (currentToken) {
          // console.log("FCM: Token generated successfully:", currentToken);
          if (typeof window !== "undefined") {
            window.localStorage.setItem("fcm_token", currentToken);
            // Send token to your backend
            let user = JSON.parse(localStorage.getItem("sanad_user") || "{}");
            // if (fcm_token != currentToken) {
            // let object = {
            //   userId: user.userId,
            //   tokenName: "SynaptixToken",
            //   token: currentToken,
            // };
            // userSetTokenCall(object)
            //   .then(({ data }) => {
            //     if (data.responseCode == 1) {
            //     }
            //   })
            //   .catch((err) => {
            //     console.log("err", err);
            //   });
            // }
          }
        } else {
          console.warn("⚠️ No registration token available.");
        }

        // Foreground message listener
        onMessage(messaging, (payload) => {
          // console.log("📩 Message received in foreground: ", payload);
          const { colour } = payload?.data ?? {};
          const { title, body } = payload?.notification ?? {};

          // Show a toast with the notification title and body
          if (title && body) {
            // Set new notification flag

            // Determine toast type and color based on notification color
            let toastType = "info";
            let toastColor = "#4F46E5"; // default blue

            if (colour === "#FF0000") {
              toastType = "error";
              toastColor = "#FF0000";
            } else if (colour === "#149914") {
              toastType = "success";
              toastColor = "#149914";
            }

            toast(body, {
              type: toastType,
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              icon: "🔔",
              style: {
                "--toastify-color-progress-error": toastColor,
                "--toastify-color-progress-success": toastColor,
                "--toastify-color-progress-info": toastColor,
                "--toastify-icon-color-error": toastColor,
                "--toastify-icon-color-success": toastColor,
                "--toastify-icon-color-info": toastColor,
              },
            });
          }
          if (payload?.notification) console.log("payload?.notification");
          // console.log("payload?.notification", payload?.notification);
          // dispatch(notificationAction(payload?.notification));
        });
      } catch (err) {
        console.error("❌ FCM setup error:", err);
      }
    };

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        registerServiceWorkerAndGetToken();
      }
    });
  }, []);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      style={{
        zIndex: 9999,
        top: "1rem",
        right: "1rem",
      }}
    />
  );
};

export default FCM;
