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
        .then((subscription) => sendSubscriptionToServer(subscription))
        .catch((err) => console.error('Push subscription error: ', err));
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function sendSubscriptionToServer(subscription) {
  // Get public key and user auth from the subscription object
  var key = subscription.getKey ? subscription.getKey('p256dh') : '';
  var auth = subscription.getKey ? subscription.getKey('auth') : '';

  // This example uses the new fetch API. This is not supported in all
  // browsers yet.
  return fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      endpoint: subscription.endpoint,
      // Take byte[] and turn it into a base64 encoded string suitable for
      // POSTing to a server over HTTP
      key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : '',
      auth: auth ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth))) : '',
    }),
  });
}

export function unsubscribeUser() {
  navigator.serviceWorker.ready.then((registration) => {
    //Find the registered push subscription in the service worker
    registration.pushManager
      .getSubscription()
      .then((subscription) => {
        if (!subscription) {
          return;
          //If there isn't a subscription, then there's nothing to do
        }
        subscription
          .unsubscribe()
          .then(() => console.log('Unsubscribed!'))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  });
}
