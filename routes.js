import express from 'express';
import { SuiService } from './services/sui-service.js';
import { MatchingEngine } from './services/matching-engine.js';

const router = express.Router();
const suiService = new SuiService();
const matchingEngine = new MatchingEngine();

router.post('/trade', async (req, res) => {
  try {
    const { pair, amount, leverage, direction } = req.body;
    
    const orderResult = await matchingEngine.processOrder({
      pair,
      amount,
      price: parseFloat(req.body.price),
      side: direction === 'LONG' ? 'bid' : 'ask',
      type: 'market'
    });

    const txResult = await suiService.submitTrade({
      ...orderResult,
      direction,
      leverage
    });

    res.json({
      success: true,
      txHash: txResult.digest,
      filledAmount: orderResult.filled.reduce((sum, t) => sum + t.amount, 0)
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;