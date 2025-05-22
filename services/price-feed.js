import WebSocket from 'ws';
import { TRADING } from '../config/constants.js';

export class PriceFeed {
  constructor() {
    this.prices = new Map(TRADING.SUPPORTED_PAIRS.map(pair => [pair, 1.50]));
  }

  start() {
    setInterval(() => this.updatePrices(), 500);
  }

  updatePrices() {
    TRADING.SUPPORTED_PAIRS.forEach(pair => {
      const fluctuation = Math.random() * 0.05 - 0.025;
      this.prices.set(pair, this.prices.get(pair) * (1 + fluctuation));
    });
  }

  getCurrentPrice(pair) {
    return this.prices.get(pair);
  }
}