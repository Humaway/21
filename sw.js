self.addEventListener('install', (event) => self.skipWaiting());
self.addEventListener('activate', (event) => console.log('Service Worker activated.'));

// 1. Wake up when Vercel sends a ping
self.addEventListener('push', function(event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: data.icon || 'https://via.placeholder.com/192',
            vibrate: [200, 100, 200, 100, 200], // Custom vibration pattern
            data: { url: '/' } // Tells the notification where to go when clicked
        };
        // 2. Force the phone to show the notification
        event.waitUntil(self.registration.showNotification(data.title, options));
    }
});

// 3. Handle the user tapping the notification
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
