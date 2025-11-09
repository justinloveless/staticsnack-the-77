/**
 * Handler for content/music-platforms.json
 * Displays music platform links in hero section
 */
export function handle(data) {
  if (!data || !data.platforms) return;
  
  const platformsContainer = document.getElementById('music-platforms');
  if (!platformsContainer) return;
  
  platformsContainer.innerHTML = '';
  
  data.platforms.forEach(platform => {
    const platformLink = document.createElement('a');
    platformLink.href = platform.url;
    platformLink.target = '_blank';
    platformLink.rel = 'noopener noreferrer';
    platformLink.className = 'music-platform-link bg-white bg-opacity-20 backdrop-blur-md rounded-full p-4 hover:bg-opacity-30 transition';
    platformLink.style.color = platform.color || '#ffffff';
    platformLink.setAttribute('aria-label', platform.name);
    
    platformLink.innerHTML = `
      <i class="${platform.icon} text-3xl"></i>
    `;
    
    platformsContainer.appendChild(platformLink);
  });
}
