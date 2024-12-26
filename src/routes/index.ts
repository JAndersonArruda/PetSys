import express from 'express';
import configurePetShopsRoutes from './petShops';
import configurePetRoutes from './pets';

const router = express.Router();

configurePetShopsRoutes(router);
configurePetRoutes(router);

export default router;