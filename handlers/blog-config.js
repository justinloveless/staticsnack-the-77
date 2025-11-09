/**
 * Handler for content/blog-config.json
 * Updates blog name and title throughout the site
 */
export function handle(data) {
  if (!data) return;
  
  // Update blog name in navigation
  const blogNameEl = document.getElementById('blog-name');
  if (blogNameEl && data.blogName) {
    blogNameEl.textContent = data.blogName;
  }
  
  // Update page title
  if (data.blogName) {
    document.title = data.blogName;
  }
  
  // Update footer blog name
  const footerTitle = document.querySelector('footer h3.blog-title');
  if (footerTitle && data.blogName) {
    footerTitle.textContent = data.blogName;
  }
  
  // Update footer description if present
  const footerDesc = document.querySelector('footer p.text-gray-400');
  if (footerDesc && data.description) {
    footerDesc.textContent = data.description;
  }
}
