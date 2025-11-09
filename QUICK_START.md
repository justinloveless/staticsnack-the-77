# Quick Start Guide

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser to see your blog!

## Project Structure

```
src/
├── index.html           # Main HTML file
├── script.js            # Main initialization script
├── asset-loader.js      # Asset loading system
├── content/             # Content JSON files
│   ├── blog-config.json
│   ├── hero.json
│   ├── author.json
│   └── social.json
├── posts/               # Blog post JSON files
│   ├── getting-started-with-web-development.json
│   ├── mastering-css-grid.json
│   ├── javascript-async-await.json
│   └── building-responsive-websites.json
└── handlers/            # Content handlers
    ├── blog-config.js
    ├── hero.js
    ├── author.js
    ├── social.js
    └── posts.js

public/
└── site-assets.json     # Asset configuration
```

## Customizing Your Blog

### 1. Update Blog Name and Info

Edit `src/content/blog-config.json`:
```json
{
  "blogName": "Your Blog Name",
  "tagline": "Your Tagline",
  "description": "Your blog description"
}
```

### 2. Update Hero Section

Edit `src/content/hero.json`:
```json
{
  "title": "Your Hero Title",
  "subtitle": "Your hero subtitle"
}
```

### 3. Update Author Info

Edit `src/content/author.json`:
```json
{
  "name": "Your Name",
  "bio": "Your biography",
  "role": "Your Role",
  "avatar": "https://your-avatar-url.com/image.jpg",
  "email": "your@email.com",
  "location": "Your Location"
}
```

### 4. Add Your Social Links

Edit `src/content/social.json`:
```json
{
  "links": [
    {
      "platform": "twitter",
      "url": "https://twitter.com/yourusername",
      "icon": "fab fa-twitter"
    }
  ]
}
```

### 5. Create Your First Blog Post

Create a new file in `src/posts/my-first-post.json`:
```json
{
  "title": "My First Post",
  "slug": "my-first-post",
  "excerpt": "This is my first blog post!",
  "content": "# My First Post\n\nWelcome to my blog!",
  "author": "Your Name",
  "date": "2024-01-15",
  "tags": ["personal", "first-post"],
  "image": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop",
  "readTime": "2 min read",
  "featured": true
}
```

The new post will automatically appear on your blog!

## Adding New Content Types

Use the CLI tool to add new assets:

```bash
npm run add-asset
```

This will:
1. Prompt you for asset details
2. Create an entry in `public/site-assets.json`
3. Generate a handler file
4. Create the content file

Example:
```bash
npm run add-asset src/content/newsletter.json
```

## Building for Production

```bash
npm run build
```

The built files will be in the root directory, ready to deploy!

## Preview Production Build

```bash
npm run preview
```

## Customizing Design

The template uses **Tailwind CSS** loaded from CDN. To customize:

1. **Colors**: Search for `purple-600`, `indigo-600` in `src/index.html` and replace with your colors
2. **Fonts**: Edit the Google Fonts import in the `<style>` section
3. **Layout**: Modify the HTML structure in `src/index.html`

## Need Help?

- Check `README.md` for comprehensive documentation
- Read `ARCHITECTURE.md` to understand how it works
- See `src/handlers/README.md` for handler documentation

## Tips

- Keep your content in JSON files - never mix content with HTML
- Each handler is responsible for one content type
- Test changes by saving and refreshing your browser
- Images should be hosted externally or in a public directory

Happy blogging! 🚀
