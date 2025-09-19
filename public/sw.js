// Import scripts in correct order
importScripts('/uv/bundle.js')
importScripts('/uv/config.js')
importScripts('/uv/sw.js')

const sw = new UVServiceWorker()

self.addEventListener('fetch', (event) => {
    // Only handle requests that should go through the proxy
    if (event.request.url.includes('/supernova/')) {
        event.respondWith(
            sw.fetch(event).catch(error => {
                console.warn('UV fetch failed:', error);
                return new Response('Proxy request failed', { 
                    status: 500,
                    statusText: 'Proxy Error' 
                });
            })
        );
    }
    // Let other requests pass through normally
});