# Vue CV App

A minimal Vue 3 + Vite single-page app that displays a CV read from JSON files.

## What is included
- A lightweight Vue 3 app (Vite) that loads data from `src/data/fr.json` and `src/data/en.json`.
- Responsive layout working on desktop and mobile.
- Simple language switcher.
- Example CV content filled using the PDF you provided. (See citation in chat.) 

## Tech & Styles used
- Vue 3
- Vite (dev server + build)
- Plain CSS for styling (responsive, minimal)

## Install & Run locally
1. Make sure you have Node.js (16+) and npm installed.
2. In project folder:
```bash
npm install
npm run dev
```
3. Open http://localhost:5173 in your browser.

## Build for production
```bash
npm run build
# serve the dist folder with any static server, or deploy to GitHub Pages
```

## Language files
Two JSON files (`src/data/fr.json` and `src/data/en.json`) are provided. You can edit them directly to update CV content. Using two files is simple and effective for switching text. For larger multilingual needs consider a proper i18n library.

## File structure
```
/src
  /data
    en.json
    fr.json
  App.vue
  main.js
  styles.css
index.html
package.json
README.md
```
