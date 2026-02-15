# Performance Tips

- ✅ Use versioned URLs in production (cached 30 days)
- ✅ Minified version (10KB vs 24KB)
- ✅ Pin to specific version
- ✅ Preload scripts for faster loading:

```html
<link rel="preload" href="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.min.js" as="script">
<link rel="preload" href="https://cdn.wokki20.nl/content/jspt-v2.1.0/jspt.css" as="style">
```

## File Sizes

| File | Size | Use Case |
|------|------|----------|
| jspt.min.js | 10KB | Production (recommended) |
| jspt.js | 24KB | Development with comments |
| jspt.module.js | 21KB | ES6 projects |
| jspt.css | 5.5KB | Required styles |

## Best Practices

1. **Use versioned CDN URLs in production** for stability and caching
2. **Use minified version** for smaller file size
3. **Lazy load icon libraries** only when needed:
   ```javascript
   jspt.importScript({
       names: ['material_symbols_rounded']
   }).then(() => {
       jspt.makeToast({
           message: "Icons loaded!",
           icon_left: "check_circle",
           icon_left_type: "google_material_rounded"
       });
   });
   ```
4. **Preload critical resources** to reduce load time