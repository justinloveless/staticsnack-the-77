function r(){const o=document.getElementById("contact-form-container");if(!o)return;o.innerHTML=`
    <form id="booking-form" class="space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-white font-semibold mb-2">Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Your name"
          >
        </div>
        <div>
          <label for="email" class="block text-white font-semibold mb-2">Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="your.email@example.com"
          >
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label for="phone" class="block text-white font-semibold mb-2">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="(555) 123-4567"
          >
        </div>
        <div>
          <label for="event-date" class="block text-white font-semibold mb-2">Event Date</label>
          <input 
            type="date" 
            id="event-date" 
            name="event-date"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
        </div>
      </div>
      <div>
        <label for="venue" class="block text-white font-semibold mb-2">Venue/Location</label>
        <input 
          type="text" 
          id="venue" 
          name="venue"
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="Venue name and location"
        >
      </div>
      <div>
        <label for="message" class="block text-white font-semibold mb-2">Message *</label>
        <textarea 
          id="message" 
          name="message" 
          rows="5"
          required
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="Tell us about your event, expected audience size, and any special requirements..."
        ></textarea>
      </div>
      <div class="flex justify-center">
        <button 
          type="submit" 
          class="bg-gradient-to-r from-pink-500 to-red-500 text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
        >
          Send Booking Request
        </button>
      </div>
    </form>
  `;const e=document.getElementById("booking-form");e&&e.addEventListener("submit",function(t){t.preventDefault();const n=new FormData(e);Object.fromEntries(n),alert(`Thank you for your booking request! We'll get back to you soon.

Note: This is a demo. In production, this would send an email or API request.`),e.reset()})}export{r as handle};
