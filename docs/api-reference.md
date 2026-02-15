# API Reference

## jspt.importScript(options)

**(Classic scripts only)** Loads external libraries like icon fonts or syntax highlighters.

**Options:**

| Property | Type | Description |
|----------|------|-------------|
| names | string[] | Array of library names to import |

**Returns:** `Promise<void[]>` - Resolves when all scripts are loaded

**Available libraries:**
- `'highlightjs'` - Highlight.js for code syntax highlighting
- `'material_symbols_rounded'` - Google Material Symbols (Rounded)
- `'material_symbols_outlined'` - Google Material Symbols (Outlined)
- `'lucide'` - Lucide Icons

**Example:**

```javascript
jspt.importScript({
    names: ['material_symbols_rounded', 'lucide']
});
```

**With Promise:**

```javascript
jspt.importScript({
    names: ['highlightjs']
}).then(() => {
    console.log('Scripts loaded successfully');
    hljs.highlightAll();
});
```

**Behavior:**
- Automatically detects and skips already-imported libraries (logs a warning to console)
- Resolves the promise once all scripts/stylesheets are loaded
- Rejects if any script fails to load

**Note:** This function is only available when using JSPT as a classic script (regular `<script>` tag). When using ES modules, you must manually include icon libraries in your HTML.

---

## jspt.makeToast(options)

Creates a toast notification.

**Options:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| message  | string | required | Message to display |
| style    | string | 'default' | Toast style ('default', 'default-error') |
| icon_left | string | undefined | Left icon content |
| icon_left_type | string | 'google_material_rounded' | Type of left icon |
| icon_left_action | function | undefined | Callback when left icon is clicked |
| icon_right | string | undefined | Right icon content |
| icon_right_type | string | 'google_material_rounded' | Type of right icon |
| icon_right_action | function | undefined | Callback when right icon is clicked |
| duration | number | 5000 | Duration in ms (-1 = persistent) |
| close_on_click | boolean | false | Close toast when clicked |
| onclick | function | undefined | Callback when toast is clicked |

**Icon Types:**
- `'google_material_rounded'` - Google Material Symbols (Rounded)
- `'google_material_outlined'` - Google Material Symbols (Outlined)
- `'svg'` - Raw SVG markup
- `'image'` - Image URL
- `'text'` - Plain text
- `'emoji'` - Emoji characters
- `'lucide_icon'` - Lucide Icons

---

## jspt.makePopup(options)

Creates a popup modal.

**Options:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| content_type | string | 'text' | 'text' or 'html' |
| style | string | 'default' | Popup style |
| header       | string | undefined | Header text |
| title | string | undefined | Popup title (text mode only) |
| message      | string | undefined | Message text (text mode only) |
| content      | string | undefined | HTML content (html mode only) |
| close_on_blur| boolean | true | Close on outside click |
| custom_id | string | random string | Custom ID for the popup |

---

## jspt.closePopup(options)

Closes a popup by ID:

**Options:**

| Property | Type | Description |
|----------|------|-------------|
| custom_id | string | Custom ID of the popup to close |

**Example:**

```javascript
jspt.closePopup({ custom_id: "popup123" });
```