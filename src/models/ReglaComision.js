const mongoose = require('mongoose');

const reglaComisionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  montoMinimo: {
    type: Number,
    required: true
  },
  montoMaximo: {
    type: Number,
    required: true
  },
  porcentaje: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  activa: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ReglaComision', reglaComisionSchema);