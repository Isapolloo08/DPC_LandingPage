import { createServer } from 'vite';
import react from '@vitejs/plugin-react';

async function start() {
  try {
    console.log('Starting Vite server...');
    const server = await createServer({
      configFile: false,
      root: process.cwd(),
      plugins: [react()],
      server: {
        port: 5173,
        host: '127.0.0.1',
      },
    });
    await server.listen();
    console.log('--- VITE DEV SERVER READY AT http://127.0.0.1:5173 ---');
    server.printUrls();
  } catch (err) {
    console.error('ERROR STARTING VITE:', err);
    process.exit(1);
  }
}

start();
