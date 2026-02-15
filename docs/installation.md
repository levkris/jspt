# Installation

## Option 1: CDN (Quick Start)

```html
<link rel="stylesheet" href="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.css">
<script src="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.min.js"></script>

<script>
jspt.importScript({
    names: ['material_symbols_rounded']
}).then(() => {
    jspt.makeToast({ 
        message: "Hello from CDN!",
        icon_left: "check_circle",
        icon_left_type: "google_material_rounded"
    });
});
</script>
```

**Important:** When using JSPT with classic scripts (regular `<script>` tag), you must call `jspt.importScript()` to load icon libraries before using icons.

---

## Option 2: Download and Self-Host

### Classic Script

```html
<link rel="stylesheet" href="dist/jspt.css">
<script src="dist/jspt.min.js"></script>

<script>
jspt.importScript({
    names: ['material_symbols_rounded']
}).then(() => {
    jspt.makeToast({ 
        message: "Hello World!",
        icon_left: "check_circle",
        icon_left_type: "google_material_rounded"
    });
});
</script>
```

### ES Module

```html
<link rel="stylesheet" href="dist/jspt.css">
<!-- Manually include icon libraries for ES modules -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded">

<script type="module">
import { makeToast } from './dist/jspt.module.js';

makeToast({ 
    message: "ES Module!",
    icon_left: "check_circle",
    icon_left_type: "google_material_rounded"
});
</script>
```

**Note:** When using ES modules, `jspt.importScript()` is not available. You must manually include icon libraries in your HTML.

---

## Option 3: NPM Package

```bash
npm install @wokki20/jspt
```

---

## Icon Libraries

### Available Libraries

When using classic scripts, call `jspt.importScript()` with one or more of these libraries:

- `'material_symbols_rounded'` - Google Material Symbols (Rounded)
- `'material_symbols_outlined'` - Google Material Symbols (Outlined)
- `'lucide'` - Lucide Icons
- `'highlightjs'` - Highlight.js (for code syntax highlighting)

**Example:**

```javascript
jspt.importScript({
    names: ['material_symbols_rounded', 'lucide', 'highlightjs']
}).then(() => {
    console.log('All libraries loaded!');
});
```