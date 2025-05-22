import express from 'express';
import cors from 'cors';
import router from './routes.js';
import { errorHandler } from './utils/error-handler.js';

export const createApp = () => {
  const app = express();
  
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS.split(','),
    methods: ['POST', 'GET']
  }));
  
  app.use(express.json());
  app.use('/api/v1', router);
  app.use(errorHandler);

  return app;
};