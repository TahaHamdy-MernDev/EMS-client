importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyALV11xiyyQZZEsuHM_PZEe-OEhnfw1sVQ",
  authDomain: "employee-management-system-ems.firebaseapp.com",
  projectId: "employee-management-system-ems",
  storageBucket: "employee-management-system-ems.appspot.com",
  messagingSenderId: "126383832566",
  appId: "1:126383832566:web:bee882fa4ae65c662d5bd7",
  measurementId: "G-6M87C4BPG4",
};

firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

class CustomPushEvent extends Event {
  constructor(data) {
    super("push");

    Object.assign(this, data);
    this.custom = true;
  }
}

/*
 * Overrides push notification data, to avoid having 'notification' key and firebase blocking
 * the message handler from being called
 */
self.addEventListener("push", (e) => {
  // Skip if event is our own custom event
  if (e.custom) return;

  // Kep old event data to override
  const oldData = e.data;

  // Create a new event to dispatch, pull values from notification key and put it in data key,
  // and then remove notification key
  const newEvent = new CustomPushEvent({
    data: {
      ehheh: oldData.json(),
      json() {
        const newData = oldData.json();
        newData.data = {
          ...newData.data,
          ...newData.notification,
        };
        delete newData.notification;
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  // Stop event propagation
  e.stopImmediatePropagation();

  // Dispatch the new wrapped event
  dispatchEvent(newEvent);
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const { title, body, image, icon, ...restPayload } = payload.data;
  const notificationOptions = {
    body,
    icon: image || "/icons/firebase-logo.png", // path to your "fallback" firebase notification logo
    data: restPayload,
  };
  return self.registration.showNotification(title, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  if (event?.notification?.data && event?.notification?.data?.link) {
    self.clients.openWindow(event.notification.data.link);
  }

  // close notification after click
  event.notification.close();
});
