import express from 'express';
import { updateOneApparel, updateManyApparels } from '../controllers/apparelController';

const router = express.Router();

router.put('/update-one', updateOneApparel);
router.put('/update-many', updateManyApparels);

export default router;