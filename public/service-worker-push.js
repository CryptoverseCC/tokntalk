// self.addEventListener('notificationclose', function(e) {
//   var notification = e.notification;
//   var data = notification.data || {};
//   var primaryKey = data.primaryKey;
//   console.debug('Closed notification: ' + primaryKey);
// });
// self.addEventListener('notificationclick', function(e) {
//   var notification = e.notification;
//   var data = notification.data || {};
//   var primaryKey = data.primaryKey;
//   var action = e.action;
//   console.debug('Clicked notification:' + primaryKey);
//   if (action === 'close') {
//     console.debug('Notification clicked and closed', primaryKey);
//     notification.close();
//   } else {
//     console.debug('Notification actioned', primaryKey);
//     clients.openWindow('/');
//     notification.close();
//   }
// });

self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');
});

self.addEventListener('push', function(event) {
  console.log(event);
  var title = 'Yay a message.';
  var body = 'We have received a push message.';
  var icon = '/images/smiley.svg';
  var tag = 'simple-push-example-tag';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
    }),
  );
});
