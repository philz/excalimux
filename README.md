# Excalimux

Excalimux is a web application that embeds the open-source Excalidraw component and allows you to create and manage multiple drawings. It features a drawer on the left-hand side to choose from your drawings, with the most recent ones displayed at the top.

## Features

- Create and manage multiple Excalidraw drawings
- Automatic saving to localStorage
- Rename drawings by double-clicking on their titles
- Responsive design
- No external dependencies (no CDN)

## Implementation Options

This repository contains three implementations:

1. **React + TypeScript + esbuild**: A full-featured implementation using React, TypeScript, and esbuild as a bundler.
2. **Simplified HTML + JS**: A simplified version using a single HTML file with embedded JavaScript, which loads React and Excalidraw from CDN (for demo purposes).
3. **Standalone HTML + JS**: A completely standalone version using HTML5 Canvas for drawing, with no external dependencies.

## Technology Stack

### Full Implementation
- React
- TypeScript
- Excalidraw
- esbuild (for bundling)
- GitHub Pages (for deployment)

### Simplified Implementation
- HTML
- CSS
- JavaScript
- Excalidraw (loaded from CDN)

### Standalone Implementation
- HTML
- CSS
- JavaScript
- HTML5 Canvas API

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/philz/excalimux.git
cd excalimux

# Install dependencies
npm install
```

### Development Server (Full Implementation)

```bash
npm run dev
```

This will start a development server at http://localhost:12000.

### Building for Production (Full Implementation)

```bash
npm run build
```

This will create a production build in the `dist` directory.

### Running the Production Build (Full Implementation)

```bash
npm start
```

This will build the project and start a server at http://localhost:12000.

### Running the Simplified Version

```bash
npx http-server src/simplified -p 12000
```

This will serve the simplified version at http://localhost:12000.

### Running the Standalone Version

```bash
npx http-server src/standalone -p 12000
```

This will serve the standalone version at http://localhost:12000.

## Deployment

The project is automatically deployed to GitHub Pages when changes are pushed to the main branch, thanks to the GitHub Actions workflow.

- The full implementation is deployed using the `deploy.yml` workflow.
- The simplified version is deployed using the `deploy-simplified.yml` workflow.
- The standalone version is deployed using the `deploy-standalone.yml` workflow.

## License

ISC