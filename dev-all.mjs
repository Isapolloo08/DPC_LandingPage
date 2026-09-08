import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(__dirname, '..', 'DPC-ManagementSystem', 'server');
const frontendDir = __dirname;

console.log('\x1b[33m%s\x1b[0m', '=======================================================');
console.log('\x1b[33m%s\x1b[0m', ' 🌟 Starting DPC ChMS Backend & Landing Page Frontend ');
console.log('\x1b[33m%s\x1b[0m', '=======================================================');
console.log(`\x1b[34m[Backend Dir]:\x1b[0m  ${backendDir}`);
console.log(`\x1b[32m[Frontend Dir]:\x1b[0m ${frontendDir}\n`);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// 1. Launch ChMS Backend (Port 4000)
const backend = spawn(npmCmd, ['run', 'dev'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: '4000' }
});

// 2. Launch Vite Landing Page (Port 5173)
const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: frontendDir,
  stdio: 'inherit',
  shell: true
});

const cleanup = () => {
  console.log('\n\x1b[33m[DPC Runner] Shutting down Backend and Frontend servers...\x1b[0m');
  try {
    if (isWindows) {
      if (backend.pid) spawn('taskkill', ['/pid', backend.pid.toString(), '/f', '/t']);
      if (frontend.pid) spawn('taskkill', ['/pid', frontend.pid.toString(), '/f', '/t']);
    } else {
      backend.kill('SIGTERM');
      frontend.kill('SIGTERM');
    }
  } catch {}
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

backend.on('error', (err) => {
  console.error('\x1b[31m[Backend Failed to Start]:\x1b[0m', err.message);
});

frontend.on('error', (err) => {
  console.error('\x1b[31m[Frontend Failed to Start]:\x1b[0m', err.message);
});
