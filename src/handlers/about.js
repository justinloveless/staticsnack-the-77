/**
 * Handler for content/about.json
 * Displays band about information
 */
export function handle(data) {
  if (!data) return;
  
  const aboutContainer = document.getElementById('about-content');
  if (!aboutContainer) return;
  
  aboutContainer.innerHTML = `
    <div>
      <img 
        src="${data.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'}" 
        alt="Band performing"
        class="w-full h-auto rounded-2xl shadow-2xl object-cover"
      >
    </div>
    <div class="space-y-6">
      <p class="text-xl text-gray-300 leading-relaxed">
        ${data.description || ''}
      </p>
      <p class="text-lg text-gray-400 leading-relaxed">
        ${data.story || ''}
      </p>
      ${data.achievements && data.achievements.length > 0 ? `
        <div class="mt-8">
          <h3 class="text-2xl font-bold mb-4 text-white">Achievements</h3>
          <ul class="space-y-3">
            ${data.achievements.map(achievement => `
              <li class="flex items-start gap-3 text-gray-300">
                <i class="fas fa-star text-yellow-400 mt-1"></i>
                <span>${achievement}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}
