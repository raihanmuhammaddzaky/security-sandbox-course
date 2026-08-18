import express from 'express';
import bankController from '../controllers/bankController.js';

const router = express.Router();

router.get('/saldo', bankController.getSaldo);
router.post('/transfer', bankController.transfer);

export default router;
