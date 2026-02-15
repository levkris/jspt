# CDN Usage

## Versioned URLs (Recommended for Production)

```html
<link rel="stylesheet" href="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.css">
<script src="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.min.js"></script>

<script>
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

**Benefits:**
- Cached for 30 days (fast loading)
- Version-locked (no breaking changes)
- Best for production websites

---

## Dynamic URLs (Latest Version)

```html
<link rel="stylesheet" href="https://cdn.wokki20.nl/dynamic/jspt/jspt.css">
<script src="https://cdn.wokki20.nl/dynamic/jspt/jspt.js"></script>

<script>
jspt.importScript({
    names: ['material_symbols_rounded']
});
</script>
```

**Benefits:**
- Always up-to-date
- Great for development/testing
- Auto-updates when new versions release

⚠️ **Note:** Not cached, may receive breaking changes

---

## ES Module from CDN

```html
<link rel="stylesheet" href="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.css">
<!-- Manually include icon libraries for ES modules -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded">

<script type="module">
import { makeToast } from 'https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.module.js';

makeToast({ 
    message: "ES Module from CDN!",
    icon_left: "check_circle",
    icon_left_type: "google_material_rounded"
});
</script>
```

**Note:** When using ES modules, `jspt.importScript()` is not available. You must manually include icon libraries in your HTML.

---

## Which Should I Use?

| Use Case | Recommended URL |
|----------|----------------|
| Production website | versioned minified JS |
| Testing/Development | dynamic JS |
| ES6 Projects | ES Module |
| Maximum performance | versioned minified + cached |