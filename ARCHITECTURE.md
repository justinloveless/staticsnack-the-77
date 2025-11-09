# Architecture Overview

## Modular Handler System

This blog template uses a modular architecture where each content asset has its own dedicated handler file. This makes the codebase scalable and maintainable.

## Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        index.html                           │
│                     (Static Structure)                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ loads
                            ▼
                    ┌───────────────┐
                    │   script.js   │
                    │  (Orchestrator)│
                    └───────┬───────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌───────────────┐   ┌──────────────┐
│site-assets   │   │   Content     │   │   Handlers   │
│   .json      │   │    Files      │   │    /*.js     │
│              │   │               │   │              │
│ • Defines    │   │ • JSON data   │   │ • blog-config│
│   assets     │   │ • Markdown    │   │ • hero       │
│ • Schemas    │   │ • Images      │   │ • author     │
│ • Handlers   │   │               │   │ • posts      │
└──────┬───────┘   └───────┬───────┘   └──────┬───────┘
       │                   │                   │
       └───────────────────┴───────────────────┘
                           │
                  Dynamically Combined
                           │
                           ▼
                    ┌─────────────┐
                    │  Rendered   │
                    │    Page     │
                    └─────────────┘
```

## Data Flow

### 1. Page Load
```javascript
document.addEventListener('DOMContentLoaded', () => {
  loadSiteAssets();  // Start the loading process
});
```

### 2. Load Configuration
```javascript
// Fetch site-assets.json
const siteAssets = await fetch('site-assets.json');
// Result: List of all assets with their handlers
```

### 3. Load Content
```javascript
// For each asset in site-assets.json
for (const asset of siteAssets.assets) {
  // Load JSON, markdown, or image
  const content = await fetch(asset.path);
  contentData[asset.path] = content;
}
```

### 4. Execute Handlers
```javascript
// For each asset with a handler
for (const asset of siteAssets.assets) {
  if (asset.handler) {
    // Dynamically import the handler module
    const handler = await import(`./${asset.handler}`);
    // Execute with loaded content
    handler.handle(contentData[asset.path]);
  }
}
```

## Asset Types

### Basic Asset Types

- **json**: JSON data files
- **text**: Plain text or Markdown files
- **image**: Image files (jpg, png, webp, etc.)
- **directory**: Container for multiple files

### Directory Assets

Directories contain multiple files of the same type and are loaded as arrays:

```json
{
  "type": "directory",
  "path": "posts",
  "contains": {
    "type": "json",
    "allowedExtensions": [".json"],
    "maxSize": 102400
  },
  "label": "Blog Posts",
  "handler": "handlers/posts.js"
}
```

**Handler receives:** Array of file paths
```javascript
[
  "posts/getting-started-with-web-development.json",
  "posts/mastering-css-grid.json",
  ...
]
```

## File Organization

```
project/
├── Core Files (Don't change often)
│   ├── index.html         - Page structure with Tailwind CSS
│   ├── script.js          - Orchestrator (rarely modified)
│   ├── asset-loader.js    - Asset loading system
│   └── site-assets.json   - Asset registry (auto-updated by CLI)
│
├── Content (Change frequently)
│   ├── content/
│   │   ├── blog-config.json  - Blog name, tagline
│   │   ├── hero.json         - Hero section content
│   │   ├── author.json       - Author information
│   │   └── social.json       - Social media links
│   │
│   └── posts/
│       ├── post-1.json    - Individual blog posts
│       └── post-2.json
│
└── Handlers (Add new, rarely modify existing)
    └── handlers/
        ├── blog-config.js - Updates blog name
        ├── hero.js        - Updates hero section
        ├── author.js      - Displays author info
        ├── social.js      - Displays social links
        ├── posts.js       - Displays blog posts
        └── README.md      - Handler documentation
```

## Benefits of This Architecture

### 1. Separation of Concerns
- **Content**: Pure data in JSON/Markdown
- **Display Logic**: Isolated in handlers
- **Structure**: HTML remains clean
- **Orchestration**: Automated in asset-loader.js

### 2. Scalability
- Add unlimited content assets
- No modifications to core files needed
- Each handler is independent

### 3. Maintainability
- Easy to find code for specific content
- Changes don't affect other handlers
- Clear file naming convention

### 4. Developer Experience
- CLI tool automates boilerplate (`npm run add-asset`)
- Handler template guides implementation
- Auto-loading reduces configuration

## Example: Adding a New Section

### Step 1: Add Asset via CLI
```bash
npm run add-asset content/testimonials.json
```

**Generated Files:**
- `content/testimonials.json` (content)
- `handlers/testimonials.js` (display logic)
- Entry in `site-assets.json` (registration)

### Step 2: Add Content
```json
// content/testimonials.json
{
  "title": "What People Say",
  "items": [
    { 
      "name": "John Doe", 
      "text": "Great content!", 
      "rating": 5 
    }
  ]
}
```

### Step 3: Implement Handler
```javascript
// handlers/testimonials.js
export function handle(data) {
  if (!data || !data.items) return;
  
  const container = document.querySelector('.testimonials');
  if (!container) return;
  
  data.items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'testimonial-card';
    el.innerHTML = `
      <p>"${item.text}"</p>
      <span>- ${item.name}</span>
      <div class="rating">${'⭐'.repeat(item.rating)}</div>
    `;
    container.appendChild(el);
  });
}
```

### Step 4: Add HTML
```html
<section class="testimonials py-16">
  <!-- Populated by handler -->
</section>
```

### Result
✓ Content managed separately  
✓ Handler auto-loads  
✓ No changes to script.js  
✓ Easy to maintain  

## Blog-Specific Architecture

### Content Types

1. **Blog Configuration** (`content/blog-config.json`)
   - Blog name, tagline, description
   - Handler updates multiple locations in the DOM

2. **Hero Section** (`content/hero.json`)
   - Main title and subtitle
   - Handler updates hero section

3. **Author Information** (`content/author.json`)
   - Name, bio, avatar, contact info
   - Handler creates author card with image

4. **Social Links** (`content/social.json`)
   - Array of social media profiles
   - Handler generates social icons

5. **Blog Posts** (`posts/` directory)
   - Multiple JSON files with post content
   - Handler loads all posts, displays featured and recent
   - Includes modal for full post view

### Post Display Logic

The posts handler implements several features:

1. **Automatic Loading**: Fetches all JSON files from posts directory
2. **Sorting**: Orders posts by date (newest first)
3. **Featured Post**: Displays one featured post prominently
4. **Post Grid**: Shows recent posts in a responsive grid
5. **Modal View**: Opens full post in an overlay
6. **Markdown Support**: Basic markdown parsing for post content

## Comparison with Other Approaches

### Static HTML
❌ Content mixed with structure  
❌ Repetitive updates  
❌ Hard to maintain  

### Template Engines (e.g., Handlebars)
✓ Separation of content  
❌ Build step required  
❌ Server-side rendering or compilation  

### Frontend Frameworks (e.g., React, Vue)
✓ Component-based  
✓ Reactive updates  
❌ Heavy dependencies  
❌ Complex setup  
❌ Overkill for static sites  

### This Template
✓ Separation of content  
✓ Modular architecture  
✓ No build step required (uses Vite for dev/build)  
✓ No heavy dependencies  
✓ Framework-agnostic  
✓ Easy to understand  
✓ Perfect for static blogs  
✓ Beautiful modern design with Tailwind CSS  

## Extension Patterns

### Custom Handler Logic
Handlers can do anything:
- Parse markdown
- Make API calls
- Perform calculations
- Transform data
- Interact with third-party libraries

### Handler Communication
Handlers can share data via:
- Global variables
- Custom events
- DOM data attributes
- LocalStorage

### Adding Functionality
To add new features:
1. Create content files with data
2. Add handler to process and display
3. Update HTML structure if needed
4. Register in site-assets.json

## Best Practices

1. **Keep handlers focused** - One responsibility per handler
2. **Validate data** - Always check if data exists before using
3. **Fail gracefully** - Don't break the page if one asset fails
4. **Document dependencies** - Note which HTML elements are required
5. **Use semantic naming** - Handler filename should match asset name
6. **Add comments** - Explain complex logic for future maintainers
7. **Test individually** - Each handler should work independently
8. **Optimize assets** - Compress images, minify JSON when needed

## Performance Considerations

- Assets load in parallel
- Handlers execute asynchronously
- Minimal JavaScript footprint
- Tailwind CSS loaded via CDN (can be built for production)
- Images lazy-load where appropriate
- No unnecessary re-renders

## Troubleshooting

### Handler not loading?
- Check path in `site-assets.json`
- Verify export syntax: `export function handle(data)`
- Check browser console for import errors

### Content not displaying?
- Verify HTML elements exist with correct selectors
- Check if data is loaded correctly (console.log)
- Ensure handler is being called (add logging)

### Assets not found?
- Verify file paths are correct relative to project root
- Check network tab in browser DevTools
- Ensure Vite is serving files correctly

## Future Enhancements

Possible additions to this architecture:
- Handler dependencies (load order)
- Handler lifecycle hooks (onLoad, onUpdate, onDestroy)
- Built-in caching mechanism
- Asset versioning and cache busting
- Handler hot-reloading for development
- TypeScript support for type safety
- Advanced markdown parsing with syntax highlighting
- Search functionality across posts
- Tag filtering and post categories
- RSS feed generation
- SEO metadata injection

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Edit content**: Modify JSON files in content/ or posts/
3. **Create new assets**: `npm run add-asset`
4. **Edit handlers**: Modify handler logic in handlers/
5. **Test**: Refresh browser to see changes
6. **Build**: `npm run build` for production
7. **Preview**: `npm run preview` to test production build

This architecture provides a solid foundation for a modern, maintainable blog while keeping complexity low and developer experience high.
