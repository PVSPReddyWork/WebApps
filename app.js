//register the service worker
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker Registered:', reg))
        .catch(err => console.error('Service Worker Registration Failed:', err));
    });
  }
  */

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
          console.log('Service Worker Registered:', reg);
  
          // Listen for updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Notify user about the update
                alert('A new version is available. Refresh the page to update.');
              }
            });
          });
        })
        .catch(err => console.error('Service Worker Registration Failed:', err));
    });
  
    // Listen for controllerchange (when a new Service Worker takes over)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload(); // Force a reload to use the updated Service Worker
    });
  }