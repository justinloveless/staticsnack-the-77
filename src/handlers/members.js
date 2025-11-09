/**
 * Handler for content/members.json
 * Displays band members in a grid
 */
export function handle(data) {
  if (!data || !data.members) return;
  
  const membersContainer = document.getElementById('members-grid');
  if (!membersContainer) return;
  
  membersContainer.innerHTML = '';
  
  data.members.forEach(member => {
    const memberCard = document.createElement('div');
    memberCard.className = 'member-card bg-gray-800 rounded-xl overflow-hidden card-hover';
    
    memberCard.innerHTML = `
      <div class="relative h-96">
        <img 
          src="${member.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}" 
          alt="${member.name}"
          class="w-full h-full object-cover"
        >
        <div class="member-info text-white">
          <h3 class="text-2xl font-bold mb-2">${member.name}</h3>
          <p class="text-pink-400 font-semibold mb-3">${member.role}</p>
          <p class="text-gray-200 text-sm">${member.bio}</p>
        </div>
      </div>
    `;
    
    membersContainer.appendChild(memberCard);
  });
}
