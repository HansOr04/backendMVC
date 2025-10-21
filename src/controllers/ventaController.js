const Venta = require('../models/Venta');
const ComisionService = require('../services/comisionService');

class VentaController {
  
  // Calcular comisiones por fecha y vendedor
  static async calcularComisiones(req, res) {
    try {
      const { fechaInicio, fechaFin, vendedorId } = req.query;

      // Validar fechas
      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({
          success: false,
          message: 'Se requieren fechaInicio y fechaFin'
        });
      }

      // Construir filtro
      const filtro = {
        fecha: {
          $gte: new Date(fechaInicio),
          $lte: new Date(fechaFin)
        }
      };

      if (vendedorId && vendedorId !== 'todos') {
        filtro.vendedor = vendedorId;
      }

      // Obtener ventas
      const ventas = await Venta.find(filtro)
        .populate('vendedor', 'nombre apellido email')
        .sort({ fecha: -1 });

      // Calcular comisiones
      const resultado = await ComisionService.calcularComisionTotal(ventas);

      res.json({
        success: true,
        data: {
          ...resultado,
          ventas: ventas.map(v => ({
            id: v._id,
            vendedor: v.vendedor,
            monto: v.monto,
            fecha: v.fecha,
            descripcion: v.descripcion
          }))
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al calcular comisiones',
        error: error.message
      });
    }
  }

  // Crear venta
  static async crear(req, res) {
    try {
      const venta = new Venta(req.body);
      await venta.save();
      
      res.status(201).json({
        success: true,
        message: 'Venta creada exitosamente',
        data: venta
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al crear venta',
        error: error.message
      });
    }
  }
}

module.exports = VentaController;