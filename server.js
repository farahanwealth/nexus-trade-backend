import http from 'http';
import { createApp } from './app.js';
import { WSServer } from './utils/ws-server.js';

const startServer = async () => {
  const app = createApp();
  const server = http.createServer(app);
  
  new WSServer(server);
  
  server.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(`WebSocket server active`);
  });
};

startServer().catch(console.error);