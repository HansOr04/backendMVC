const mongoose = require('mongoose');

const vendedorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Método virtual para nombre completo
vendedorSchema.virtual('nombreCompleto').get(function() {
  return `${this.nombre} ${this.apellido}`;
});

module.exports = mongoose.model('Vendedor', vendedorSchema);