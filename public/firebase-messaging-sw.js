/* public/firebase-messaging-sw.js */
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBj1fZlx_wvNErVzJ2GhyPhSFSpc--myoE",
  authDomain: "safar-capital-ae106.firebaseapp.com",
  projectId: "safar-capital-ae106",
  messagingSenderId: "117579506105",
  appId: "1:117579506105:web:fa8cdfbd86c5f3850ed668",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // Check if 'notification' key exists in the root or in 'data'
  if (payload.notification) {
    const { title, body } = payload.notification;

    const notificationOptions = {
      body,
      icon: "/tracking-ksa-logo.png",
    };
    self.registration.showNotification(title, notificationOptions);
  } else if (payload.data && payload.data.notification) {
    const { title, body } = JSON.parse(payload.data.notification); // if it's in 'data'

    const notificationOptions = {
      body,
      icon: "/tracking-ksa-logo.png",
    };
    self.registration.showNotification(title, notificationOptions);
  } else {
    console.warn("No notification object found in payload:", payload);
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // or a custom route
  );
});
