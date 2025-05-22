import WebSocket from 'ws';
import { PriceFeed } from '../services/price-feed.js';

export class WSServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.priceFeed = new PriceFeed();
    this.priceFeed.start();
    
    this.wss.on('connection', (ws) => {
      this.setupPriceUpdates(ws);
      this.setupErrorHandling(ws);
    });
  }

  setupPriceUpdates(ws) {
    const interval = setInterval(() => {
      const prices = Object.fromEntries(this.priceFeed.prices);
      ws.send(JSON.stringify({ type: 'priceUpdate', data: prices }));
    }, 500);

    ws.on('close', () => clearInterval(interval));
  }

  broadcastPositions(positions) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'positionUpdate', data: positions }));
      }
    });
  }

  setupErrorHandling(ws) {
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }
}