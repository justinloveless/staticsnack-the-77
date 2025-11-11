/**
 * Handler for content/gigs directory (combo assets)
 * Displays upcoming gigs/calendar from event + JSON combos
 */

/**
 * Parse iCalendar (.ics) data to extract event information
 */
function parseICalendar(icsContent) {
  const lines = icsContent.split('\n').map(line => line.trim());
  const event = {};
  
  lines.forEach(line => {
    if (line.startsWith('DTSTART:')) {
      const dateStr = line.substring(8);
      // Parse YYYYMMDDTHHMMSS format
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const hour = dateStr.substring(9, 11);
      const minute = dateStr.substring(11, 13);
      event.date = `${year}-${month}-${day}`;
      event.time = `${hour}:${minute}`;
    } else if (line.startsWith('SUMMARY:')) {
      event.summary = line.substring(8);
    } else if (line.startsWith('LOCATION:')) {
      event.location = line.substring(9);
    } else if (line.startsWith('DESCRIPTION:')) {
      event.description = line.substring(12);
    } else if (line.startsWith('URL:')) {
      event.url = line.substring(4);
    }
  });
  
  return event;
}

/**
 * Format time from HH:MM to human-readable format
 */
function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
  return `${displayHour}:${minutes} ${ampm}`;
}

export function handle(data) {
  if (!data || typeof data !== 'object') return;
  
  const gigsContainer = document.getElementById('gigs-list');
  if (!gigsContainer) return;
  
  gigsContainer.innerHTML = '';
  
  // Convert combo data to array of gigs
  const gigs = [];
  for (const [baseName, files] of Object.entries(data)) {
    const icsContent = files['.ics'];
    const jsonData = files['.json'];
    
    if (!icsContent || !jsonData) continue;
    
    // Parse iCalendar event
    const event = parseICalendar(icsContent);
    
    // Combine with JSON metadata
    const gig = {
      ...event,
      venue: jsonData.venue,
      ticketUrl: jsonData.ticketUrl,
      featured: jsonData.featured || false
    };
    
    gigs.push(gig);
  }
  
  // Sort gigs by date
  const sortedGigs = gigs.sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));
  
  sortedGigs.forEach(gig => {
    const gigDate = new Date(gig.date);
    const formattedDate = gigDate.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const formattedTime = formatTime(gig.time);
    
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
              <span>${formattedTime}</span>
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
