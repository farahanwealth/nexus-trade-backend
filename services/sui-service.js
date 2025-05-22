import { SuiClient, TransactionBlock } from '@mysten/sui.js/client';
import { TRADING } from '../config/constants.js';

export class SuiService {
  constructor() {
    this.client = new SuiClient({ url: process.env.SUI_NODE_URL });
  }

  async submitTrade(trade) {
    const tx = new TransactionBlock();
    
    tx.moveCall({
      target: `${process.env.PERP_CONTRACT}::nexus::execute_trade`,
      arguments: [
        tx.object(SUi_CONFIG.DEEPBOOK_POOL),
        tx.pure.u64(trade.amount * 10 ** TRADING.PRICE_PRECISION),
        tx.pure.u64(trade.price * 10 ** TRADING.PRICE_PRECISION),
        tx.pure.bool(trade.direction === 'LONG'),
        tx.pure.u64(trade.leverage)
      ],
    });

    return this.client.executeTransactionBlock({
      transactionBlock: tx,
      signer: process.env.SERVICE_ACCOUNT
    });
  }
}