const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendedor',
    required: true
  },
  monto: {
    type: Number,
    required: true,
    min: 0
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  descripcion: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Venta', ventaSchema);