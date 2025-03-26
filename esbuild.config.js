const esbuild = require('esbuild');
const fs = require('fs-extra');
const path = require('path');

// Check if watch mode is enabled
const watchMode = process.argv.includes('--watch');

// Clean dist directory
const distDir = path.join(__dirname, 'dist');
fs.removeSync(distDir);
fs.ensureDirSync(distDir);

// Copy public files to dist
fs.copySync(path.join(__dirname, 'public'), distDir);

// Build options
const buildOptions = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: path.join(distDir, 'bundle.js'),
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  loader: {
    '.js': 'jsx',
    '.ts': 'tsx',
    '.png': 'file',
    '.svg': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.gif': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file',
  },
};

// Build the app
if (watchMode) {
  // Watch mode
  esbuild.build({
    ...buildOptions,
    watch: {
      onRebuild(error, result) {
        if (error) {
          console.error('Watch build failed:', error);
        } else {
          console.log('Watch build succeeded:', result);
        }
      },
    },
  }).catch(() => process.exit(1));
} else {
  // One-time build
  esbuild.buildSync(buildOptions);
}