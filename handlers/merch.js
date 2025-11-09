/**
 * Handler for content/merch.json
 * Displays merchandise items
 */
export function handle(data) {
  if (!data || !data.items) return;
  
  const merchContainer = document.getElementById('merch-grid');
  if (!merchContainer) return;
  
  merchContainer.innerHTML = '';
  
  data.items.forEach(item => {
    const merchCard = document.createElement('div');
    merchCard.className = 'merch-card bg-gray-800 rounded-xl overflow-hidden card-hover';
    
    merchCard.innerHTML = `
      <div class="relative h-64 overflow-hidden">
        <img 
          src="${item.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'}" 
          alt="${item.name}"
          class="w-full h-full object-cover"
        >
      </div>
      <div class="p-6">
        <h3 class="text-xl font-bold text-white mb-2">${item.name}</h3>
        <p class="text-gray-400 text-sm mb-3">${item.description || ''}</p>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-pink-400">${item.price}</span>
          <button class="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105">
            Buy Now
          </button>
        </div>
      </div>
    `;
    
    merchContainer.appendChild(merchCard);
  });
}
