export default function registerPushWorker() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker-push.js`;

      navigator.serviceWorker.ready.then(() => {
        console.log('Push worker ready!');
      });

      registerValidSW(swUrl);
    });
  }
}

const vapidPublicKey = 'BB7h_1Sa_JNe9jQ3kFuIIusC-lBLZzkkKxOCqb4C5Ghesw31-P7gayfFmSOu9oUKeIONyHbbS5Mv9pf000CqOdU';
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('Service Worker is registered', registration);
      registration.pushManager
        .subscribe({
          userVisibleOnly: true, //Always display notifications
          applicationServerKey: convertedVapidKey,
        })
        .then((subscription) => console.log(JSON.stringify(subscription)))
        .catch((err) => console.error('Push subscription error: ', err));
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}
