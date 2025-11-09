/**
 * Handler for content/author.json
 * Displays author information in the about section
 */
export function handle(data) {
  if (!data) return;
  
  const authorContainer = document.getElementById('author-info');
  if (!authorContainer) return;
  
  // Clear existing content
  authorContainer.innerHTML = '';
  
  // Create author card
  const authorHTML = `
    <div class="flex-shrink-0">
      <img 
        src="${data.avatar || 'https://via.placeholder.com/200'}" 
        alt="${data.name}"
        class="w-48 h-48 rounded-full object-cover shadow-lg"
      >
    </div>
    <div class="flex-1 text-center md:text-left">
      <h3 class="text-3xl font-bold text-gray-900 mb-2">${data.name}</h3>
      ${data.role ? `<p class="text-purple-600 font-semibold mb-4">${data.role}</p>` : ''}
      <p class="text-gray-700 text-lg leading-relaxed mb-6">${data.bio}</p>
      <div class="flex flex-wrap gap-4 justify-center md:justify-start text-gray-600">
        ${data.location ? `
          <div class="flex items-center gap-2">
            <i class="fas fa-map-marker-alt text-purple-600"></i>
            <span>${data.location}</span>
          </div>
        ` : ''}
        ${data.email ? `
          <div class="flex items-center gap-2">
            <i class="fas fa-envelope text-purple-600"></i>
            <a href="mailto:${data.email}" class="hover:text-purple-600 transition">${data.email}</a>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  
  authorContainer.innerHTML = authorHTML;
}
