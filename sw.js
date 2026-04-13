// sw.js - The Service Worker

self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated.');
});

// This listens for clicks on the notification to bring you back to the chat
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // If the tab is open, focus it
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            // If the tab is closed, open a new one
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
