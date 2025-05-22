import { OrderBook } from 'orderbook-javascript';
import { TRADING } from '../config/constants.js';

export class MatchingEngine {
  constructor() {
    this.orderBooks = new Map();
    TRADING.SUPPORTED_PAIRS.forEach(pair => {
      this.orderBooks.set(pair, new OrderBook());
    });
  }

  async processOrder(order) {
    const ob = this.orderBooks.get(order.pair);
    const result = ob.executeOrder({
      id: order.id,
      price: order.price,
      amount: order.amount,
      side: order.side,
      type: order.type
    });

    return {
      filled: result.matchedOrders,
      remaining: result.remainingOrder,
      averagePrice: result.avgPrice
    };
  }
}