/**
 * Handler for content/gigs.json
 * Displays upcoming gigs/calendar
 */
export function handle(data) {
  if (!data || !data.gigs) return;
  
  const gigsContainer = document.getElementById('gigs-list');
  if (!gigsContainer) return;
  
  gigsContainer.innerHTML = '';
  
  // Sort gigs by date
  const sortedGigs = [...data.gigs].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  sortedGigs.forEach(gig => {
    const gigDate = new Date(gig.date);
    const formattedDate = gigDate.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const gigCard = document.createElement('div');
    gigCard.className = 'gig-card rounded-xl p-6 card-hover';
    
    gigCard.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex-1">
          <div class="flex items-center gap-4 mb-3">
            <div class="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg">
              ${gigDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white mb-1">${gig.venue}</h3>
              <p class="text-gray-400">${gig.location}</p>
            </div>
          </div>
          <div class="flex items-center gap-4 text-gray-300 mb-2">
            <div class="flex items-center gap-2">
              <i class="far fa-calendar"></i>
              <span>${formattedDate}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="far fa-clock"></i>
              <span>${gig.time}</span>
            </div>
          </div>
          ${gig.description ? `<p class="text-gray-400 mt-2">${gig.description}</p>` : ''}
        </div>
        ${gig.ticketUrl ? `
          <div>
            <a 
              href="${gig.ticketUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition transform hover:scale-105 inline-block"
            >
              Get Tickets
            </a>
          </div>
        ` : ''}
      </div>
    `;
    
    gigsContainer.appendChild(gigCard);
  });
}
