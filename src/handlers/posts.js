/**
 * Handler for posts directory
 * Displays all blog posts in the posts grid and featured section
 */
export function handle(postFiles) {
  if (!postFiles || !Array.isArray(postFiles)) return;
  
  // Fetch all post JSON files
  const postPromises = postFiles.map(file => 
    fetch(file)
      .then(response => response.json())
      .catch(error => {
        console.warn(`Failed to load post: ${file}`, error);
        return null;
      })
  );
  
  Promise.all(postPromises).then(posts => {
    // Filter out null values (failed loads)
    const validPosts = posts.filter(post => post !== null);
    
    // Sort by date (newest first)
    validPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display featured post
    const featuredPost = validPosts.find(post => post.featured);
    if (featuredPost) {
      displayFeaturedPost(featuredPost);
    }
    
    // Display recent posts (exclude featured from the grid)
    const recentPosts = validPosts.filter(post => !post.featured || post !== featuredPost);
    displayRecentPosts(recentPosts);
  });
}

/**
 * Display a featured post in the featured section
 */
function displayFeaturedPost(post) {
  const container = document.getElementById('featured-post');
  if (!container) return;
  
  container.innerHTML = `
    <div class="relative">
      <img 
        src="${post.image}" 
        alt="${post.title}"
        class="w-full h-96 object-cover rounded-2xl shadow-lg"
      >
    </div>
    <div>
      <div class="flex gap-2 mb-4 flex-wrap">
        ${post.tags.map(tag => `
          <span class="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
            ${tag}
          </span>
        `).join('')}
      </div>
      <h3 class="text-4xl font-bold text-gray-900 mb-4 blog-title">${post.title}</h3>
      <p class="text-gray-600 text-lg mb-6">${post.excerpt}</p>
      <div class="flex items-center gap-4 mb-6 text-sm text-gray-500">
        <div class="flex items-center gap-2">
          <i class="far fa-calendar"></i>
          <span>${formatDate(post.date)}</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="far fa-clock"></i>
          <span>${post.readTime}</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="far fa-user"></i>
          <span>${post.author}</span>
        </div>
      </div>
      <button 
        onclick="showPostModal('${post.slug}')" 
        class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
      >
        Read More →
      </button>
    </div>
  `;
}

/**
 * Display recent posts in the grid
 */
function displayRecentPosts(posts) {
  const container = document.getElementById('posts-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  posts.forEach(post => {
    const postCard = document.createElement('div');
    postCard.className = 'bg-white rounded-xl shadow-md overflow-hidden card-hover cursor-pointer';
    postCard.onclick = () => showPostModal(post.slug);
    
    postCard.innerHTML = `
      <img 
        src="${post.image}" 
        alt="${post.title}"
        class="w-full h-48 object-cover"
      >
      <div class="p-6">
        <div class="flex gap-2 mb-3 flex-wrap">
          ${post.tags.slice(0, 2).map(tag => `
            <span class="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
              ${tag}
            </span>
          `).join('')}
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2 blog-title line-clamp-2">
          ${post.title}
        </h3>
        <p class="text-gray-600 mb-4 line-clamp-3">${post.excerpt}</p>
        <div class="flex items-center justify-between text-sm text-gray-500">
          <div class="flex items-center gap-2">
            <i class="far fa-calendar"></i>
            <span>${formatDate(post.date)}</span>
          </div>
          <span>${post.readTime}</span>
        </div>
      </div>
    `;
    
    container.appendChild(postCard);
  });
}

/**
 * Format date string to readable format
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

/**
 * Show post in a modal (simplified version - you can enhance this)
 */
window.showPostModal = function(slug) {
  // Fetch the post data
  fetch(`posts/${slug}.json`)
    .then(response => response.json())
    .then(post => {
      // Create and show modal
      const modal = document.createElement('div');
      modal.id = 'post-modal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto';
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      };
      
      // Simple markdown to HTML conversion (basic)
      const contentHTML = post.content
        .replace(/### (.*)/g, '<h3 class="text-2xl font-bold mt-6 mb-3">$1</h3>')
        .replace(/## (.*)/g, '<h2 class="text-3xl font-bold mt-8 mb-4">$1</h2>')
        .replace(/# (.*)/g, '<h1 class="text-4xl font-bold mt-8 mb-4">$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
        .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
        .replace(/\n\n/g, '</p><p class="mb-4">')
        .replace(/\n- (.*)/g, '<li>$1</li>');
      
      modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
          <div class="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">${post.title}</h2>
            <button onclick="document.getElementById('post-modal').remove()" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>
          <div class="p-8">
            <img src="${post.image}" alt="${post.title}" class="w-full h-64 object-cover rounded-lg mb-6">
            <div class="flex items-center gap-4 mb-6 text-sm text-gray-500 flex-wrap">
              <div class="flex items-center gap-2">
                <i class="far fa-user"></i>
                <span>${post.author}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="far fa-calendar"></i>
                <span>${formatDate(post.date)}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="far fa-clock"></i>
                <span>${post.readTime}</span>
              </div>
            </div>
            <div class="flex gap-2 mb-6 flex-wrap">
              ${post.tags.map(tag => `
                <span class="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                  ${tag}
                </span>
              `).join('')}
            </div>
            <div class="prose prose-lg max-w-none">
              <p class="mb-4">${contentHTML}</p>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
    })
    .catch(error => {
      console.error('Failed to load post:', error);
      alert('Failed to load post. Please try again.');
    });
};
