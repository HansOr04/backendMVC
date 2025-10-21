const express = require('express');
const cors = require('cors');
const vendedorRoutes = require('./routes/vendedor.routes');
const ventaRoutes = require('./routes/venta.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/vendedores', vendedorRoutes);
app.use('/api/ventas', ventaRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API funcionando correctamente' 
  });
});

module.exports = app;