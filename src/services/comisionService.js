const ReglaComision = require('../models/ReglaComision');

class ComisionService {
  
  // Calcular comisión basada en el monto
  static async calcularComision(monto) {
    const reglas = await ReglaComision.find({ activa: true }).sort({ montoMinimo: 1 });
    
    for (const regla of reglas) {
      if (monto >= regla.montoMinimo && monto <= regla.montoMaximo) {
        return {
          monto: monto,
          comision: (monto * regla.porcentaje) / 100,
          porcentaje: regla.porcentaje,
          regla: regla.nombre
        };
      }
    }
    
    // Si supera todas las reglas, usar la última
    const ultimaRegla = reglas[reglas.length - 1];
    return {
      monto: monto,
      comision: (monto * ultimaRegla.porcentaje) / 100,
      porcentaje: ultimaRegla.porcentaje,
      regla: ultimaRegla.nombre
    };
  }

  // Calcular comisiones para múltiples ventas
  static async calcularComisionTotal(ventas) {
    let totalVentas = 0;
    let totalComisiones = 0;
    const detalles = [];

    for (const venta of ventas) {
      const resultado = await this.calcularComision(venta.monto);
      totalVentas += venta.monto;
      totalComisiones += resultado.comision;
      
      detalles.push({
        ventaId: venta._id,
        monto: venta.monto,
        comision: resultado.comision,
        porcentaje: resultado.porcentaje,
        regla: resultado.regla
      });
    }

    return {
      totalVentas,
      totalComisiones,
      cantidadVentas: ventas.length,
      detalles
    };
  }
}

module.exports = ComisionService;