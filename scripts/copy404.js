import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const distIndex = join(process.cwd(), 'dist', 'index.html');
const dist404 = join(process.cwd(), 'dist', '404.html');

if (!existsSync(distIndex)) {
  console.error('dist/index.html does not exist. Please run the build first.');
  process.exit(1);
}

copyFileSync(distIndex, dist404);
console.log('Copied dist/index.html to dist/404.html for SPA GitHub Pages routing.');
