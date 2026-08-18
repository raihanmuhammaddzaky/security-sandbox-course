const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const bankRoutes = require('./bankRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/', authRoutes);
router.use('/', bankRoutes);
router.use('/komentar', commentRoutes);

module.exports = router;
