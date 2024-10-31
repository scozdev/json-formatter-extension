# JSON Formatter Chrome Extension

A Chrome extension that automatically formats JSON data on web pages, making it easier to read and navigate through JSON structures.

## Features

- 🎨 Automatic JSON formatting
- 📋 Copy JSON to clipboard
- 🔍 Expand/Collapse JSON levels
- ⚙️ Customizable settings
- 🌙 Dark/Light theme support
- 👀 Hover preview option

## Installation

### Prerequisites
- Node.js and npm installed on your computer

### Installation Steps
1. Clone/Download this repository
2. Open terminal in the extension folder
3. Install dependencies:
```bash
npm install
```
4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the extension folder

## Usage

- The extension automatically detects and formats JSON content on web pages
- Use the control buttons to:
  - Copy formatted JSON
  - Expand all levels
  - Collapse all levels
- Access settings by clicking the extension icon in toolbar

## Settings

- Default open level: Choose how many levels to expand by default
- Theme: Select between light and dark themes
- Hover Preview: Enable/disable JSON preview on hover
- Allowed URLs: Manage where the formatter should run

## License

MIT
