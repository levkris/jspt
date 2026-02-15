# Examples

## CDN Example

```html
<link rel="stylesheet" href="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.css">
<script src="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.min.js"></script>

<script>
jspt.importScript({
    names: ['material_symbols_rounded']
}).then(() => {
    console.log('Icons loaded!');
});
</script>

<button onclick="showToast()">Show Toast</button>
<button onclick="jspt.makePopup({ content_type: 'text', header: 'Info', message: 'Hello Popup!' })">Show Popup</button>

<script>
function showToast() {
    jspt.makeToast({ 
        message: 'Hello CDN!', 
        icon_left: 'check_circle', 
        icon_left_type: 'google_material_rounded' 
    });
}
</script>
```

---

## Self-Hosted Example

### Classic Script

```html
<link rel="stylesheet" href="dist/jspt.css">
<script src="dist/jspt.min.js"></script>

<script>
jspt.importScript({
    names: ['material_symbols_rounded']
}).then(() => {
    jspt.makeToast({ 
        message: "Self-hosted toast",
        icon_left: "notifications",
        icon_left_type: "google_material_rounded"
    });

    jspt.makePopup({ 
        content_type: 'text', 
        header: 'Welcome', 
        message: 'Hello!' 
    });
});
</script>
```

---

## ES Module Example

```html
<link rel="stylesheet" href="dist/jspt.css">
<!-- Manually include icon libraries for ES modules -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded">

<script type="module">
import { makeToast, makePopup } from './dist/jspt.module.js';

makeToast({ 
    message: "ES Module toast",
    icon_left: "check_circle",
    icon_left_type: "google_material_rounded"
});

makePopup({ 
    content_type: "text", 
    header: "ES Module", 
    message: "Hello!" 
});
</script>
```

**Note:** When using ES modules, you cannot use `jspt.importScript()`. Include icon libraries manually in your HTML as shown above.

---

## Using Promises with importScript

```html
<link rel="stylesheet" href="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.css">
<script src="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.min.js"></script>

<script>
jspt.importScript({
    names: ['highlightjs']
}).then(() => {
    console.log('Highlight.js loaded successfully');
    hljs.highlightAll();
}).catch(error => {
    console.error('Failed to load scripts:', error);
});
</script>
```

---

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSPT Example</title>
    
    <link rel="stylesheet" href="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.css">
    <script src="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.min.js"></script>
</head>
<body>
    <h1>JSPT Demo</h1>
    <button onclick="showToast()">Show Toast</button>
    <button onclick="showPopup()">Show Popup</button>
    <button onclick="showError()">Show Error</button>

    <script>
        jspt.importScript({
            names: ['material_symbols_rounded']
        }).then(() => {
            console.log('Icons ready');
        });

        function showToast() {
            jspt.makeToast({
                message: "Operation completed!",
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
                message: "This is a demo popup.",
                close_on_blur: true
            });
        }

        function showError() {
            jspt.makeToast({
                style: "default-error",
                message: "Something went wrong!",
                icon_left: "error",
                icon_left_type: "google_material_rounded",
                duration: -1,
                close_on_click: true
            });
        }
    </script>
</body>
</html>
```