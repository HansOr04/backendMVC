const express = require('express');
const router = express.Router();
const VentaController = require('../controllers/ventaController');

router.get('/comisiones', VentaController.calcularComisiones);
router.post('/', VentaController.crear);

module.exports = router;