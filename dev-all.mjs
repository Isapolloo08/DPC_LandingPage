import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(__dirname, '..', 'DPC-ManagementSystem', 'server');
const frontendDir = __dirname;

console.log('\x1b[33m%s\x1b[0m', '=======================================================');
console.log('\x1b[33m%s\x1b[0m', ' 🌟 Starting DPC ChMS Backend (Port 5000) & Landing Page (Port 5173) ');
console.log('\x1b[33m%s\x1b[0m', '=======================================================');
console.log(`\x1b[34m[Backend Dir]:\x1b[0m  ${backendDir}`);
console.log(`\x1b[32m[Frontend Dir]:\x1b[0m ${frontendDir}\n`);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

let backend = null;

// Check if backend directory exists
if (!fs.existsSync(backendDir)) {
  console.warn(`\x1b[31m[Backend Warning]:\x1b[0m Directory "${backendDir}" was not found.`);
  console.warn(`\x1b[33m[Notice]:\x1b[0m The Landing Page will run using built-in fallback data for Ministries & Events.\n`);
} else {
  console.log(`\x1b[36m[Backend]:\x1b[0m Launching server on PORT 5000...`);
  backend = spawn(npmCmd, ['run', 'dev'], {
    cwd: backendDir,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, PORT: '5000' }
  });

  backend.on('error', (err) => {
    console.error('\x1b[31m[Backend Failed to Start]:\x1b[0m', err.message);
  });
}

// 2. Launch Vite Landing Page (Port 5173)
console.log(`\x1b[32m[Frontend]:\x1b[0m Launching Vite dev server...`);
const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: frontendDir,
  stdio: 'inherit',
  shell: true
});

const cleanup = () => {
  console.log('\n\x1b[33m[DPC Runner] Shutting down Backend and Frontend servers...\x1b[0m');
  try {
    if (isWindows) {
      if (backend && backend.pid) spawn('taskkill', ['/pid', backend.pid.toString(), '/f', '/t']);
      if (frontend && frontend.pid) spawn('taskkill', ['/pid', frontend.pid.toString(), '/f', '/t']);
    } else {
      if (backend) backend.kill('SIGTERM');
      if (frontend) frontend.kill('SIGTERM');
    }
  } catch {}
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

frontend.on('error', (err) => {
  console.error('\x1b[31m[Frontend Failed to Start]:\x1b[0m', err.message);
});
