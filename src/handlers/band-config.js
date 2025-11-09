/**
 * Handler for content/band-config.json
 * Updates band name and title throughout the site
 */
export function handle(data) {
  if (!data) return;
  
  // Update band name in navigation
  const bandNameEl = document.getElementById('band-name');
  if (bandNameEl && data.bandName) {
    bandNameEl.textContent = data.bandName;
  }
  
  // Update page title
  if (data.bandName) {
    document.title = data.bandName;
  }
  
  // Update footer band name
  const footerTitle = document.getElementById('footer-band-name');
  if (footerTitle && data.bandName) {
    footerTitle.textContent = data.bandName;
  }
  
  // Update footer copyright name
  const footerCopyright = document.getElementById('footer-copyright-name');
  if (footerCopyright && data.bandName) {
    footerCopyright.textContent = data.bandName;
  }
  
  // Update footer description if present
  const footerDesc = document.getElementById('footer-description');
  if (footerDesc && data.description) {
    footerDesc.textContent = data.description;
  }
}
