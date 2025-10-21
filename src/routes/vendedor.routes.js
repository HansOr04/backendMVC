const express = require('express');
const router = express.Router();
const VendedorController = require('../controllers/vendedorController');

router.get('/', VendedorController.obtenerTodos);
router.post('/', VendedorController.crear);

module.exports = router;