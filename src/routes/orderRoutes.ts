import express from 'express';
import { canFullFill, getLowestCost } from '../controllers/orderController';

const router = express.Router();

router.get('/can-fulfill/:code/:size/:quantity', canFullFill);
router.get('/get-lowest-cost/:code/:size/:quantity', getLowestCost);

export default router;