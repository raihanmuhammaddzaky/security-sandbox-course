import express from 'express';
import commentController from '../controllers/commentController.js';

const router = express.Router();

router.get('/', commentController.getComments);
router.post('/', commentController.addComment);

export default router;
