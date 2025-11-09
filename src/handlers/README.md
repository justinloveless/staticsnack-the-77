# Handlers Directory

This directory contains handler files for each content asset defined in `site-assets.json`.

## What are Handlers?

Each handler is a JavaScript module that defines how to display a specific content asset. Handlers are automatically loaded and executed by the asset loader.

## Handler Structure

Every handler file exports a `handle` function:

```javascript
/**
 * Handler for content/your-asset.json
 * Description of what this handler does
 */
export function handle(data) {
  if (!data) return;
  
  // Your DOM manipulation logic here
  const element = document.querySelector('.your-section');
  if (element) {
    element.textContent = data.title;
  }
}
```

## Parameters

The `handle` function receives:
- **data**: The loaded content from the asset file
  - For JSON files: parsed JavaScript object
  - For text/markdown files: string content
  - For image files: the file path as a string
  - For directory assets: array of file paths or grouped data

## Existing Handlers

### blog-config.js
Updates the blog name, title, and footer information throughout the site.

**Data structure:**
```json
{
  "blogName": "string",
  "tagline": "string",
  "description": "string"
}
```

### hero.js
Updates the hero section title and subtitle.

**Data structure:**
```json
{
  "title": "string",
  "subtitle": "string"
}
```

### author.js
Displays author information including avatar, bio, and contact details.

**Data structure:**
```json
{
  "name": "string",
  "bio": "string",
  "role": "string",
  "avatar": "string (URL)",
  "email": "string",
  "location": "string"
}
```

### social.js
Displays social media links in the footer.

**Data structure:**
```json
{
  "links": [
    {
      "platform": "string",
      "url": "string",
      "icon": "string (Font Awesome class)"
    }
  ]
}
```

### posts.js
Loads and displays all blog posts from the posts directory. Handles both featured and recent posts.

**Data structure:** Array of file paths to JSON files, each containing:
```json
{
  "title": "string",
  "slug": "string",
  "excerpt": "string",
  "content": "string (markdown)",
  "author": "string",
  "date": "string (YYYY-MM-DD)",
  "tags": ["string"],
  "image": "string (URL)",
  "readTime": "string",
  "featured": "boolean"
}
```

## Creating New Handlers

### Automatic Generation
Use the CLI tool to automatically create handlers:
```bash
npm run add-asset
```

This will:
1. Add the asset to `site-assets.json`
2. Create a handler file with boilerplate code
3. Create the content file if it doesn't exist

### Manual Creation
1. Create a new `.js` file in this directory
2. Export a `handle` function
3. Reference it in `site-assets.json` with the `handler` field

Example:
```javascript
// handlers/newsletter.js
export function handle(data) {
  if (!data) return;
  
  const container = document.getElementById('newsletter-content');
  if (container) {
    container.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.description}</p>
    `;
  }
}
```

## Best Practices

- **Check for data**: Always validate data exists before using it
- **Fail gracefully**: Use optional chaining and null checks
- **Keep it focused**: Each handler should only handle its own asset
- **Use clear selectors**: Document what DOM elements are required
- **Add comments**: Explain complex logic for future maintainers
- **Test independently**: Each handler should work independently

## Debugging

If a handler isn't working:
1. Check browser console for errors
2. Verify the handler path in `site-assets.json` is correct
3. Ensure `handle` function is exported
4. Check that DOM elements exist before manipulating them
5. Verify content file is loading correctly
6. Add `console.log()` statements to track execution

## Common Patterns

### Injecting HTML
```javascript
export function handle(data) {
  const container = document.getElementById('my-section');
  if (container && data) {
    container.innerHTML = `<div>${data.content}</div>`;
  }
}
```

### Looping Through Arrays
```javascript
export function handle(data) {
  if (!data || !Array.isArray(data.items)) return;
  
  const container = document.getElementById('list');
  data.items.forEach(item => {
    const el = document.createElement('div');
    el.textContent = item.text;
    container.appendChild(el);
  });
}
```

### Handling Directory Assets
```javascript
export function handle(files) {
  if (!files || !Array.isArray(files)) return;
  
  // Load all files
  const promises = files.map(file => fetch(file).then(r => r.json()));
  
  Promise.all(promises).then(dataArray => {
    // Process all loaded data
    displayData(dataArray);
  });
}
```

### Error Handling
```javascript
export function handle(data) {
  try {
    if (!data) throw new Error('No data provided');
    
    // Your logic here
  } catch (error) {
    console.error('Handler error:', error);
    // Optionally display error to user
  }
}
```

## Advanced Techniques

### Dynamic Event Handlers
```javascript
export function handle(data) {
  const container = document.getElementById('interactive-section');
  if (!container || !data) return;
  
  container.innerHTML = `
    <button id="my-button">${data.buttonText}</button>
  `;
  
  document.getElementById('my-button').addEventListener('click', () => {
    alert(data.message);
  });
}
```

### Using External Libraries
```javascript
// If you need markdown parsing, marked.js, etc.
export function handle(data) {
  if (!data || !data.markdown) return;
  
  // Assuming marked.js is loaded
  const html = marked.parse(data.markdown);
  document.getElementById('content').innerHTML = html;
}
```

### Lazy Loading Images
```javascript
export function handle(images) {
  if (!images || !Array.isArray(images)) return;
  
  images.forEach(img => {
    const imgEl = document.createElement('img');
    imgEl.loading = 'lazy';
    imgEl.src = img;
    document.getElementById('gallery').appendChild(imgEl);
  });
}
```

## Tips

- Always test your handlers after creation
- Use browser DevTools to inspect the DOM
- Keep handlers simple and readable
- Consider reusability when writing logic
- Document any special requirements or dependencies
