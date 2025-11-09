/**
 * Handler for content/hero.json
 * Updates the hero section title, subtitle, and video
 */
export function handle(data) {
  if (!data) return;
  
  // Update hero title
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle && data.title) {
    heroTitle.textContent = data.title;
  }
  
  // Update hero subtitle
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle && data.subtitle) {
    heroSubtitle.textContent = data.subtitle;
  }
  
  // Update hero video
  if (data.videoUrl) {
    const videoSource = document.getElementById('hero-video-source');
    const video = document.getElementById('hero-video');
    if (videoSource && video) {
      videoSource.src = data.videoUrl;
      video.load();
    }
  }
}
