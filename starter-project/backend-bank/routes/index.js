import express from 'express';
import authRoutes from './authRoutes.js';
import bankRoutes from './bankRoutes.js';
import commentRoutes from './commentRoutes.js';

const router = express.Router();

router.use('/', authRoutes);
router.use('/', bankRoutes);
router.use('/komentar', commentRoutes);

export default router;
