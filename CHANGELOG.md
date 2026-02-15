# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.6] - 2026-02-15

### Changed
- Fixed issue with the `.d.ts` file having a `;` when it shouldn't have been

## [2.0.5] - 2026-02-14

### Added
- Option for [lucide icons](https://lucide.dev/icons/) in toasts

### Changed
- How imports work in regulair scripts, you now need to call `importScript()` first to import the correct dependencies

### Improved
- Updated documentation to contain the new importScript() function

## [2.0.4] - 2026-02-14

### Changed
- Fixed issue with the close icon in popups, so they now use `&times;` instead of an icon from google material

## [2.0.3] - 2026-02-14

### Changed
- Fixed issue with header height in popups

## [2.0.2] - 2026-02-14

### Changed
- Fixed issue with the custom id for popups

### Improved
- Updated documentation

## [2.0.1] - 2026-02-14

### Added
- Option for a custom id for popups

## [2.0.0] - 2026-02-14

### Added
- Full JSDoc annotations for VS Code intellisense
- TypeScript definitions file (jspt.d.ts)
- ES module support (jspt.module.js)
- Minified production version (jspt.min.js)
- Comprehensive README with API documentation
- Example files for both script tag and ES module usage
- MIT License
- Package.json for NPM distribution
- jsconfig.json for improved VS Code support

### Changed
- Refactored code for better maintainability
- Improved error handling
- Updated code style with modern JavaScript practices
- Restructured project with proper folder organization

### Improved
- Better parameter destructuring
- Cleaner function signatures
- Enhanced type safety with TypeScript definitions
- More consistent code formatting

## [1.0.0] - Initial Release

### Added
- Toast notification system
- Popup modal system
- Closing popup modals
- Error handling with code highlighting
- Multiple icon types support
- Customizable styles and durations
- Close on click functionality
- Custom toast IDs
- Stacking toast animations