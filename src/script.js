/**
 * Main script file - initializes the site by loading assets and handlers
 */
import { loadSiteAssets } from './asset-loader.js';

// Initialize site when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
  try {
    console.log('Loading site assets...');
    await loadSiteAssets(async () => {
      console.log('All assets and handlers loaded successfully!');
      
      // Initialize contact form handler
      try {
        const contactHandler = await import('./handlers/contact.js');
        if (typeof contactHandler.handle === 'function') {
          contactHandler.handle();
        }
      } catch (error) {
        console.warn('Failed to load contact handler:', error);
      }
    });
  } catch (error) {
    console.error('Error initializing site:', error);
  }
});

