const Vendedor = require('../models/Vendedor');

class VendedorController {
  
  // Obtener todos los vendedores
  static async obtenerTodos(req, res) {
    try {
      const vendedores = await Vendedor.find({ activo: true });
      res.json({
        success: true,
        data: vendedores
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener vendedores',
        error: error.message
      });
    }
  }

  // Crear vendedor
  static async crear(req, res) {
    try {
      const vendedor = new Vendedor(req.body);
      await vendedor.save();
      
      res.status(201).json({
        success: true,
        message: 'Vendedor creado exitosamente',
        data: vendedor
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al crear vendedor',
        error: error.message
      });
    }
  }
}

module.exports = VendedorController;