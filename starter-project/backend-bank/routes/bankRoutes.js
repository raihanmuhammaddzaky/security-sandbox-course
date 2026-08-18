const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');

router.get('/saldo', bankController.getSaldo);
router.post('/transfer', bankController.transfer);

module.exports = router;
