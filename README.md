# StaticSnack Template - Blank

A minimal starter template for building static websites with JSON-based content management on [StaticSnack.com](https://staticsnack.com). This template provides the essential foundation for creating dynamic static sites with manageable assets and content.

## Features

- **JSON-Based Content Management** - Define and manage your site's assets through a simple JSON configuration
- **Dynamic Asset Loading** - Automatically load and handle images, JSON data, markdown, and more
- **Modular Architecture** - Extensible handler system for custom asset processing
- **Vite-Powered Build** - Fast development server with HMR and optimized production builds
- **Type Support** - Works with images, JSON, text, markdown, and directory-based assets
- **Handler System** - Custom handlers for asset-specific rendering logic

## Quick Start

### Prerequisites

- Node.js (v20.19+ or v22.12+)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the Vite development server with hot module replacement:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

Build the site to static HTML at the repository root:

```bash
npm run build
```

This generates `index.html` and `script.js` at the root, ready for deployment.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
.
├── src/
│   ├── index.html         # Main HTML entry point
│   ├── script.js          # Site initialization script
│   └── asset-loader.js    # Generic asset loading module
├── public/
│   └── site-assets.json   # Asset configuration file
├── package.json        # Dependencies and scripts
└── # Modern Blog Static Site Template

A beautiful, modern blog template built with dynamic asset loading. Easily manage your content with JSON files and dynamically inject it into your site using handlers.

## ✨ Features

- 🎨 **Modern Design** - Beautiful, responsive design using Tailwind CSS
- 📝 **Dynamic Content** - JSON-based content management
- 🔧 **Modular Handlers** - Each content type has its own handler
- 🚀 **Easy to Use** - Simple CLI commands to add new assets
- 📱 **Fully Responsive** - Looks great on all devices
- ⚡ **Fast & Lightweight** - No heavy frameworks, just vanilla JavaScript
- 🎯 **SEO Friendly** - Semantic HTML structure

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see your blog in action!

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
/
├── content/              # Content files (JSON)
│   ├── blog-config.json  # Blog name, tagline, description
│   ├── hero.json         # Hero section content
│   ├── author.json       # Author information
│   └── social.json       # Social media links
├── posts/                # Blog posts (JSON)
│   ├── getting-started-with-web-development.json
│   ├── mastering-css-grid.json
│   └── ...
├── handlers/             # Content handlers (JavaScript)
│   ├── blog-config.js    # Updates blog name and config
│   ├── hero.js           # Updates hero section
│   ├── author.js         # Displays author info
│   ├── social.js         # Displays social links
│   └── posts.js          # Displays blog posts
├── asset-loader.js       # Core asset loading system
├── script.js             # Main initialization script
├── site-assets.json      # Asset configuration
└── index.html            # Main HTML file
```

## 📝 Managing Content

### Updating Existing Content

Simply edit the JSON files in the `content/` or `posts/` directories:

#### Blog Configuration
Edit `content/blog-config.json`:
```json
{
  "blogName": "Your Blog Name",
  "tagline": "Your Tagline",
  "description": "Brief description of your blog"
}
```

#### Hero Section
Edit `content/hero.json`:
```json
{
  "title": "Welcome to My Blog",
  "subtitle": "Exploring ideas, sharing knowledge"
}
```

#### Author Information
Edit `content/author.json`:
```json
{
  "name": "Your Name",
  "bio": "Your biography...",
  "role": "Your Role",
  "avatar": "https://your-avatar-url.com/image.jpg",
  "email": "your@email.com",
  "location": "Your Location"
}
```

#### Blog Posts
Create or edit files in `posts/` directory:
```json
{
  "title": "Your Post Title",
  "slug": "your-post-slug",
  "excerpt": "Brief description of your post",
  "content": "# Full post content in Markdown\n\nYour content here...",
  "author": "Author Name",
  "date": "2024-01-15",
  "tags": ["tag1", "tag2"],
  "image": "https://image-url.com/image.jpg",
  "readTime": "5 min read",
  "featured": false
}
```

### Adding New Assets

Use the built-in CLI tool to add new assets:

```bash
npm run add-asset
```

This will:
1. Prompt you for asset details
2. Create an entry in `site-assets.json`
3. Generate a handler file with boilerplate code
4. Create the asset file if it doesn't exist

**Example:**
```bash
npm run add-asset content/newsletter.json
```

This creates:
- `content/newsletter.json` - The content file
- `handlers/newsletter.js` - The handler with template code
- Updates `site-assets.json` with the new asset configuration

## 🎨 Customizing the Design

### Colors
The template uses Tailwind CSS. To change colors, modify the class names in `index.html`:

- Primary color: `purple-600`, `indigo-600`
- Text colors: `gray-900`, `gray-600`, `gray-500`
- Background: `gray-50`, `white`

### Fonts
Edit the Google Fonts import in `index.html`:
```html
<style>
  @import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');
</style>
```

### Layout
Modify `index.html` to change the structure. The template includes:
- Navigation bar
- Hero section
- Featured post section
- Recent posts grid
- About section
- Newsletter signup
- Footer with social links

## 🔧 How It Works

### The Handler System

Each content asset has a corresponding handler that defines how to display it:

```javascript
// handlers/your-asset.js
export function handle(data) {
  if (!data) return;
  
  // Your DOM manipulation logic here
  const element = document.querySelector('.your-section');
  if (element) {
    element.textContent = data.title;
  }
}
```

### Asset Loading Flow

1. **Page loads** → `script.js` initializes
2. **Load config** → Fetches `site-assets.json`
3. **Load content** → Fetches all content files
4. **Execute handlers** → Each handler injects content into DOM

### Directory Assets

Directory assets automatically load all files matching the criteria:

```json
{
  "path": "posts",
  "type": "directory",
  "contains": {
    "type": "json",
    "allowedExtensions": [".json"]
  }
}
```

The handler receives an array of file paths and can process them as needed.

## 📚 Content Schema

### Blog Post Schema
```json
{
  "title": "string (required)",
  "slug": "string (required)",
  "excerpt": "string (required)",
  "content": "string (markdown, required)",
  "author": "string (required)",
  "date": "string (YYYY-MM-DD, required)",
  "tags": ["array of strings"],
  "image": "string (URL)",
  "readTime": "string",
  "featured": "boolean"
}
```

### Author Schema
```json
{
  "name": "string (required)",
  "bio": "string (required)",
  "role": "string (optional)",
  "avatar": "string (URL, optional)",
  "email": "string (optional)",
  "location": "string (optional)"
}
```

## 🛠️ Advanced Usage

### Creating Custom Handlers

1. Create a new content file:
```bash
touch content/custom-section.json
```

2. Add to `site-assets.json`:
```json
{
  "path": "content/custom-section.json",
  "type": "json",
  "label": "Custom Section",
  "handler": "handlers/custom-section.js"
}
```

3. Create the handler:
```javascript
// handlers/custom-section.js
export function handle(data) {
  // Your custom logic here
}
```

### Adding HTML Sections

Add new sections to `index.html` where you want content to appear:

```html
<section id="custom-section" class="py-16">
  <div class="max-w-7xl mx-auto px-4">
    <!-- Content will be injected here by handler -->
  </div>
</section>
```

## 🎯 Best Practices

1. **Keep handlers focused** - One responsibility per handler
2. **Validate data** - Always check if data exists before using
3. **Use semantic HTML** - Good for SEO and accessibility
4. **Optimize images** - Use appropriate sizes and formats
5. **Test on devices** - Ensure responsive design works everywhere

## 🐛 Troubleshooting

### Handler not loading?
- Check the path in `site-assets.json` is correct
- Verify the handler exports a `handle` function
- Check browser console for errors

### Content not displaying?
- Ensure HTML elements have correct IDs/classes
- Verify JSON is valid (use a JSON validator)
- Check if the handler is being called (add console.log)

### Images not loading?
- Verify image URLs are accessible
- Check for CORS issues with external images
- Ensure image paths are correct

## 📄 License

MIT License - feel free to use this template for any project!

## 🤝 Contributing

Found a bug or want to add a feature? Feel free to submit issues and pull requests!

---

Built with ❤️ using vanilla JavaScript, Tailwind CSS, and the power of dynamic asset loading.          # This file
```

## Managing Assets

### site-assets.json

This file defines all manageable assets for your site. Assets can be:

- **Images** - JPEG, PNG, WebP, GIF, SVG
- **JSON** - Structured data files
- **Text/Markdown** - Content files
- **Directories** - Collections of related assets

Example configuration:

```json
{
  "version": "1.0",
  "description": "Configuration file defining manageable assets",
  "assets": [
    {
      "path": "data/content.json",
      "type": "json",
      "description": "Main content data"
    },
    {
      "path": "images/hero.jpg",
      "type": "image",
      "description": "Hero image"
    },
    {
      "path": "content/about.md",
      "type": "text",
      "description": "About page content"
    }
  ]
}
```

### Adding Assets

Use the CLI tool to interactively add assets:

```bash
npm run add-asset
```

### Asset Handlers

Create custom handlers to process and render assets automatically. Handlers are JavaScript modules that export a `handle` function:

```javascript
// src/handlers/content-handler.js
export function handle(data, path) {
    // Process the loaded data
    console.log('Loaded content from:', path);
    
    // Render to DOM
    document.getElementById('content').innerHTML = data.title;
}
```

Reference handlers in `site-assets.json`:

```json
{
  "path": "data/content.json",
  "type": "json",
  "handler": "handlers/content-handler.js"
}
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production (outputs to root) |
| `npm run preview` | Preview production build |
| `npm run init` | Initialize project and dependencies |
| `npm run add-asset` | Interactively add a new asset |
| `npm run generate-schema` | Generate schema documentation |

## Asset Loader API

The asset loader is available in your JavaScript:

```javascript
import { loadSiteAssets, getContentData } from './asset-loader.js';

// Load all assets
const { siteAssets, contentData } = await loadSiteAssets();

// Access loaded content
const data = getContentData();
console.log(data['data/content.json']);
```

### loadSiteAssets(assetsPathOrCallback, onComplete)

Loads all assets and executes handlers.

**Parameters:**
- `assetsPathOrCallback` - Path to assets config or callback function (default: 'site-assets.json')
- `onComplete` - Optional callback executed after all handlers run

**Returns:** `Promise<{siteAssets, contentData}>`

### getContentData()

Returns the loaded content data object.

**Returns:** `Object` - Content data keyed by asset path

## Directory Assets

The asset loader supports directory-based assets for organizing related files:

### Simple Directory

```json
{
  "path": "images/gallery",
  "type": "directory",
  "contains": {
    "type": "image",
    "allowedExtensions": [".jpg", ".png"]
  }
}
```

### Combo Assets

Load paired files (e.g., image + metadata):

```json
{
  "path": "portfolio",
  "type": "directory",
  "contains": {
    "type": "combo",
    "parts": [
      {
        "assetType": "image",
        "allowedExtensions": [".jpg", ".png"]
      },
      {
        "assetType": "json",
        "allowedExtensions": [".json"]
      }
    ]
  }
}
```

## Building Your Site

1. **Add Content** - Create JSON, markdown, or other content files
2. **Configure Assets** - Define assets in `site-assets.json` or use `npm run add-asset`
3. **Create Handlers** - Write handlers to render your content
4. **Style Your Site** - Add CSS and customize `index.html`
5. **Deploy** - Upload to StaticSnack or any static hosting

## Deployment

This template works with any static hosting platform:

- **StaticSnack.com** - Native integration with asset management
- **Netlify** - Drag and drop deployment
- **Vercel** - Git-based deployment
- **GitHub Pages** - Free hosting for public repos
- **AWS S3** - Scalable cloud hosting

Simply upload all files to your hosting provider. No build step required.

## Best Practices

- **Organize Assets** - Use directories to group related content
- **Use Handlers** - Keep rendering logic separate and reusable
- **Version Control** - Track `site-assets.json` changes
- **Optimize Images** - Compress images before adding to project
- **Test Locally** - Always test with a local server before deploying

## Browser Support

This template uses ES modules and modern JavaScript features:

- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 79+

## Troubleshooting

### Assets Not Loading

- Ensure you're using a local server (not file:// protocol)
- Check browser console for errors
- Verify asset paths in `site-assets.json`

### Handlers Not Executing

- Confirm handler exports a `handle` function
- Check handler path is relative to project root
- Review browser console for import errors

## License

MIT

## Support

For issues, questions, or contributions:
- Visit [StaticSnack.com](https://staticsnack.com)
- Check the documentation
- Open an issue on the repository

---

**Made with StaticSnack** - Simple static site management
