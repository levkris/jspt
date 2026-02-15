# JSPT - JavaScript Popup & Toast Library

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/levkris/jspt.svg)](https://github.com/levkris/jspt/issues)
[![GitHub stars](https://img.shields.io/github/stars/levkris/jspt.svg)](https://github.com/levkris/jspt/stargazers)

A modern, lightweight JavaScript library for creating beautiful toast notifications and popups with comprehensive error handling and VS Code intellisense support.

📚 **[View Full Documentation](https://jspt.js.org)**

## 🚀 Quick Start

Get started in seconds with our CDN:

```html
<!DOCTYPE html>
<html>
<head>
    <!-- JSPT CSS -->
    <link rel="stylesheet" href="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.css">
    <!-- JSPT JavaScript -->
    <script src="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.min.js"></script>
</head>
<body>
    <script>
        // Import icon libraries (required for classic scripts)
        jspt.importScript({
            names: ['material_symbols_rounded']
        });

        // Show a toast notification
        jspt.makeToast({
            message: "Hello World!",
            duration: 3000
        });
        
        // Show a popup
        jspt.makePopup({
            content_type: "text",
            header: "Welcome",
            message: "JSPT is ready to use!"
        });
    </script>
</body>
</html>
```

That's it! No installation, no build tools, just add two lines and start coding. ✨

## 📁 Project Structure

```
jspt/
├── src/                   # Source files (for development)
├── dist/                  # Distribution files (ready to use)
├── examples/              # Usage examples
├── .github/               # GitHub templates and workflows
├── README.md             # This file
├── LICENSE               # MIT License
├── CHANGELOG.md          # Version history
├── CONTRIBUTING.md       # Contribution guide
└── package.json          # NPM configuration
```

See [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) for detailed information.

## Features

- 🎨 Beautiful toast notifications and popups
- 🔧 Full TypeScript/JSDoc support for VS Code intellisense
- 📦 Multiple import options (script tag, ES module, minified)
- 🎯 Smart error handling with code highlighting
- ⚡ No extra required dependencies (unless you want icons like Lucide or Google Material)
- 🎭 Customizable icons and styles
- 📱 Responsive and mobile-friendly

## Installation

### Option 1: CDN (Recommended for Quick Start)

#### Production (Pinned Version - Stable)
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.css">

<!-- JavaScript (minified) -->
<script src="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.min.js"></script>

<!-- Usage -->
<script>
// Import icon libraries (required for classic scripts when using icons)
jspt.importScript({
    names: ['material_symbols_rounded']
});

jspt.makeToast({
    message: "Hello from CDN!",
    icon_left: "check_circle",
    icon_left_type: "google_material_rounded"
});
</script>
```

#### Development (Always Latest)
```html
<!-- Auto-updates to latest version -->
<link rel="stylesheet" href="https://cdn.wokki20.nl/dynamic/jspt/jspt.css">
<script src="https://cdn.wokki20.nl/dynamic/jspt/jspt.js"></script>
```

#### ES Module from CDN
```html
<link rel="stylesheet" href="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.css">

<script type="module">
import { makeToast, makePopup } from 'https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.module.js';

makeToast({ message: "ES Module from CDN!" });
</script>
```

**Note:** When using ES modules, you must manually include icon libraries in your HTML if needed:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded">
```

### Option 2: Download and Self-Host

#### Script Tag (Classic Script)
```html
<link rel="stylesheet" href="dist/jspt.css">
<script src="dist/jspt.js"></script>

<script>
// Import icon libraries first (required for classic scripts when using icons)
jspt.importScript({
    names: ['material_symbols_rounded']
});

jspt.makeToast({
    message: "Hello World!",
    icon_left: "check_circle",
    icon_left_type: "google_material_rounded"
});
</script>
```

#### Minified Version (Production)
```html
<link rel="stylesheet" href="dist/jspt.css">
<script src="dist/jspt.min.js"></script>
```

#### ES Module Import
```javascript
import { makeToast, makePopup } from './dist/jspt.module.js';

makeToast({
    message: "Hello from ES modules!"
});
```

**Note:** For ES modules, manually include icon libraries in your HTML:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded">
```

### Option 3: NPM Package

```bash
npm install @wokki20/jspt
```

## Icon Libraries

### Classic Scripts (Regular `<script>` tag)

When using JSPT with classic scripts, you **must** call `jspt.importScript()` to load icon libraries:

```javascript
jspt.importScript({
    names: ['material_symbols_rounded', 'material_symbols_outlined', 'lucide']
});
```

**Available icon libraries:**
- `'material_symbols_rounded'` - Google Material Symbols (Rounded)
- `'material_symbols_outlined'` - Google Material Symbols (Outlined)
- `'lucide'` - Lucide Icons
- `'highlightjs'` - Highlight.js (for code syntax highlighting)

### ES Modules

When using ES modules, `jspt.importScript()` is not available. You must manually include icon libraries in your HTML:

```html
<!-- Material Symbols -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded">

<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest"></script>
```

## CDN Usage

JSPT is hosted on `https://cdn.wokki20.nl` with two delivery methods:

### Versioned URLs (Recommended for Production)

Use specific versions for stability and caching:

```html
<!-- v2.0.6 - Minified (10KB) -->
<script src="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.min.js"></script>

<!-- v2.0.6 - Full with JSDoc (24KB) -->
<script src="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.js"></script>

<!-- v2.0.6 - ES Module (21KB) -->
<script type="module" src="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.module.js"></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.css">

<!-- TypeScript Definitions -->
/// <reference path="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.d.ts" />
```

✅ **Benefits:**
- Cached for 30 days (fast loading)
- Version-locked (no breaking changes)
- Best for production websites

### Dynamic URLs (Latest Version)

Always get the newest version automatically:

```html
<!-- Default -->
<script src="https://cdn.wokki20.nl/dynamic/jspt/jspt.js"></script>

<!-- Minified -->
<script src="https://cdn.wokki20.nl/dynamic/jspt/jspt.js?type=min"></script>

<!-- ES Module -->
<script type="module" src="https://cdn.wokki20.nl/dynamic/jspt/jspt.js?type=module"></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.wokki20.nl/dynamic/jspt/jspt.css">

<!-- TypeScript Definitions -->
/// <reference path="https://cdn.wokki20.nl/dynamic/jspt/jspt.d.ts" />
```

✅ **Benefits:**
- Always up-to-date
- Great for development/testing
- Auto-updates when new versions release

⚠️ **Note:** Not cached, may receive breaking changes

### Which Should I Use?

| Use Case | Recommended URL |
|----------|----------------|
| Production website | `content/jspt-v2.0.6/jspt.min.js` (versioned) |
| Testing/Development | `dynamic/jspt/jspt.js` (dynamic) |
| Maximum performance | `content/jspt-v2.0.6/jspt.min.js` (minified + cached) |
| ES6 Projects | `content/jspt-v2.0.6/jspt.module.js` (versioned module) |
| TypeScript Projects | `content/jspt-v2.0.6/jspt.d.ts` (type definitions) |

## Usage

### Toast Notifications

#### Basic Toast

```javascript
jspt.makeToast({
    message: "This is a basic toast!"
});
```

#### Toast with Icon

```javascript
// For classic scripts, import icons first
jspt.importScript({
    names: ['material_symbols_rounded']
});

jspt.makeToast({
    message: "Success!",
    style: "default",
    icon_left: "check_circle",
    icon_left_type: "google_material_rounded",
    duration: 3000
});
```

#### Toast with Action

```javascript
jspt.makeToast({
    message: "Click to view details",
    icon_right: "info",
    icon_right_type: "google_material_rounded",
    icon_right_action: () => {
        console.log("Info clicked!");
    },
    duration: 5000
});
```

#### Error Toast

```javascript
jspt.makeToast({
    style: "default-error",
    message: "An error occurred!",
    icon_left: "error",
    duration: -1,
    close_on_click: true
});
```

### Popups

#### Text Popup

```javascript
jspt.makePopup({
    content_type: "text",
    header: "Welcome",
    title: "Hello User",
    message: "This is a simple text popup.",
    close_on_blur: true
});
```

#### HTML Popup

```javascript
jspt.makePopup({
    content_type: "html",
    header: "Custom Content",
    content: "<h2>Custom HTML</h2><p>You can put any HTML here!</p>",
    close_on_blur: true
});
```

## API Reference

### `jspt.importScript(options)`

**(Classic scripts only)** Loads external libraries like icon fonts or syntax highlighters.

**Options:**

| Property | Type | Description |
|----------|------|-------------|
| `names` | string[] | Array of library names to import |

**Available libraries:**
- `'highlightjs'` - Highlight.js for code syntax highlighting
- `'material_symbols_rounded'` - Google Material Symbols (Rounded)
- `'material_symbols_outlined'` - Google Material Symbols (Outlined)
- `'lucide'` - Lucide Icons

**Example:**
```javascript
jspt.importScript({
    names: ['material_symbols_rounded', 'lucide', 'highlightjs']
});
```

### `jspt.makeToast(options)`

Creates a toast notification.

**Options:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `message` | string | *required* | The message to display |
| `style` | string | `'default'` | Toast style (`'default'`, `'default-error'`) |
| `custom_id` | string | `undefined` | Custom ID for the toast (replaces existing toast with same ID) |
| `icon_left` | string | `undefined` | Left icon content |
| `icon_left_type` | string | `'google_material_rounded'` | Type of left icon |
| `icon_left_action` | function | `undefined` | Callback when left icon is clicked |
| `icon_right` | string | `undefined` | Right icon content |
| `icon_right_type` | string | `'google_material_rounded'` | Type of right icon |
| `icon_right_action` | function | `undefined` | Callback when right icon is clicked |
| `duration` | number | `5000` | Duration in ms (-1 for persistent) |
| `close_on_click` | boolean | `false` | Close toast when clicked |
| `onclick` | function | `undefined` | Callback when toast is clicked |

**Icon Types:**
- `'google_material_rounded'` - Google Material Symbols (Rounded)
- `'google_material_outlined'` - Google Material Symbols (Outlined)
- `'svg'` - Raw SVG markup
- `'image'` - Image URL
- `'text'` - Plain text
- `'emoji'` - Emoji characters
- `'lucide_icon'` - Lucide Icons

### `jspt.makePopup(options)`

Creates a popup modal.

**Options:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content_type` | string | `'text'` | Content type (`'text'` or `'html'`) |
| `style` | string | `'default'` | Popup style |
| `header` | string | `undefined` | Popup header text |
| `title` | string | `undefined` | Popup title (text mode only) |
| `message` | string | `undefined` | Popup message (text mode only) |
| `content` | string | `undefined` | HTML content (html mode only) |
| `close_on_blur` | boolean | `true` | Close when clicking outside |
| `custom_id` | string | `random string` | Custom ID for the popup |

### `jspt.closePopup(options)`

Closes a popup modal.

**Options:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `custom_id` | string | `undefined` | Custom ID of the popup to close |

## VS Code Intellisense

This library includes comprehensive JSDoc comments and TypeScript definitions for full intellisense support in VS Code.

### For Script Tag Usage:

Add this to your `jsconfig.json` or `tsconfig.json`:

```json
{
  "compilerOptions": {
    "checkJs": true,
    "lib": ["ES2020", "DOM"]
  },
  "include": ["**/*.js"]
}
```

### For ES Module Usage:

The TypeScript definitions are automatically picked up when you import the module.

## Examples

### Complete Example (CDN)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSPT CDN Example</title>
    
    <!-- JSPT from CDN -->
    <link rel="stylesheet" href="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.css">
    <script src="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.min.js"></script>
</head>
<body>
    <h1>JSPT Example</h1>
    <button onclick="showToast()">Show Toast</button>
    <button onclick="showPopup()">Show Popup</button>

    <script>
        jspt.importScript({
            names: ['material_symbols_rounded']
        });

        function showToast() {
            jspt.makeToast({
                message: "Hello from CDN!",
                icon_left: "check_circle",
                icon_left_type: "google_material_rounded",
                duration: 3000
            });
        }

        function showPopup() {
            jspt.makePopup({
                content_type: "text",
                header: "Information",
                title: "Welcome!",
                message: "This popup is loaded from cdn.wokki20.nl",
                close_on_blur: true
            });
        }
    </script>
</body>
</html>
```

### Complete Example (Self-Hosted)

See `examples/example-script.html` for a full working example.

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dist/jspt.css">
</head>
<body>
    <button onclick="showToast()">Show Toast</button>
    <button onclick="showPopup()">Show Popup</button>

    <script src="dist/jspt.js"></script>
    <script>
        jspt.importScript({
            names: ['material_symbols_rounded']
        });

        function showToast() {
            jspt.makeToast({
                message: "Hello World!",
                icon_left: "notifications",
                icon_left_type: "google_material_rounded",
                duration: 3000
            });
        }

        function showPopup() {
            jspt.makePopup({
                content_type: "text",
                header: "Information",
                title: "Welcome!",
                message: "This is a popup example.",
                close_on_blur: true
            });
        }
    </script>
</body>
</html>
```

### ES Module Example

#### From CDN
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.css">
    <!-- Manually include icon libraries for ES modules -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded">
</head>
<body>
    <button id="myButton">Show Toast</button>
    <button id="errorButton">Show Error</button>

    <script type="module">
        import { makeToast } from 'https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.module.js';

        document.getElementById('myButton').addEventListener('click', () => {
            makeToast({
                message: "Button clicked!",
                icon_left: "check",
                icon_left_type: "google_material_rounded",
                duration: 2000
            });
        });

        document.getElementById('errorButton').addEventListener('click', () => {
            makeToast({
                style: "default-error",
                message: "Something went wrong",
                icon_left: "error",
                icon_left_type: "google_material_rounded",
                duration: -1,
                close_on_click: true
            });
        });
    </script>
</body>
</html>
```

#### Self-Hosted

See `examples/example-module.html` for a full working example.

```javascript
import { makeToast, makePopup } from './dist/jspt.module.js';

document.getElementById('myButton').addEventListener('click', () => {
    makeToast({
        message: "Button clicked!",
        icon_left: "check",
        duration: 2000
    });
});

document.getElementById('errorButton').addEventListener('click', () => {
    makeToast({
        style: "default-error",
        message: "Something went wrong",
        icon_left: "error",
        duration: -1,
        close_on_click: true
    });
});
```

## Styling

The library uses CSS custom properties for easy customization. You can override these in your own CSS:

```css
.toast-container .toast {
    --translate: 0px;
    --scale: 1;
    --cursor: default;
}
```

## Performance Tips

### Using CDN
- ✅ **Use versioned URLs in production** - Cached for 30 days
- ✅ **Use minified version** - 58% smaller (10KB vs 24KB)
- ✅ **Pin to specific version** - Avoid unexpected breaking changes
- ✅ **Preload for faster loading:**
  ```html
  <link rel="preload" href="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.min.js" as="script">
  <link rel="preload" href="https://cdn.wokki20.nl/content/jspt-v2.0.6/jspt.css" as="style">
  ```

### File Sizes
| File | Size | Use Case |
|------|------|----------|
| jspt.min.js | 10KB | Production (recommended) |
| jspt.js | 24KB | Development with comments |
| jspt.module.js | 21KB | ES6 projects |
| jspt.css | 5.5KB | Required styles |

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Dependencies

- [Highlight.js](https://highlightjs.org/) - Used for syntax highlighting in error popups (loaded automatically)

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed version history.

## License

MIT - See [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors
- Inspired by modern toast notification libraries
- Built with ❤️ for the JavaScript community

## Support

- 🌐 **CDN:** https://cdn.wokki20.nl
- 📚 **Documentation:** https://jspt.js.org
- 📫 **Issues:** [github.com/levkris/jspt/issues](https://github.com/levkris/jspt/issues)
- ⭐ **Star this repo** if you find it useful!
- 🔗 **Share it** with others

### Quick Links
- [Full Documentation](https://jspt.js.org)
- [Installation Guide](#installation)
- [Icon Libraries](#icon-libraries)
- [CDN Usage](#cdn-usage)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Contributing Guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)