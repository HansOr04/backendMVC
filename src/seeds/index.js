require('dotenv').config();
const mongoose = require('mongoose');
const Vendedor = require('../models/Vendedor');
const Venta = require('../models/Venta');
const ReglaComision = require('../models/ReglaComision');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Datos de ejemplo
const vendedores = [
  { nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@minicore.com' },
  { nombre: 'María', apellido: 'González', email: 'maria.gonzalez@minicore.com' },
  { nombre: 'Carlos', apellido: 'Rodríguez', email: 'carlos.rodriguez@minicore.com' },
  { nombre: 'Ana', apellido: 'Martínez', email: 'ana.martinez@minicore.com' }
];

const reglasComision = [
  {
    nombre: 'Comisión Básica',
    montoMinimo: 0,
    montoMaximo: 600,
    porcentaje: 6.0
  },
  {
    nombre: 'Comisión Media',
    montoMinimo: 601,
    montoMaximo: 800,
    porcentaje: 8.0
  },
  {
    nombre: 'Comisión Alta',
    montoMinimo: 801,
    montoMaximo: 1000,
    porcentaje: 10.0
  },
  {
    nombre: 'Comisión Premium',
    montoMinimo: 1001,
    montoMaximo: 999999,
    porcentaje: 15.0
  }
];

// Generar ventas aleatorias
const generarVentas = (vendedoresIds) => {
  const ventas = [];
  const descripciones = [
    'Venta de productos electrónicos',
    'Venta de software',
    'Venta de servicios de consultoría',
    'Venta de licencias',
    'Venta de equipos',
    'Venta de accesorios'
  ];

  // Generar 50 ventas en los últimos 3 meses
  const hoy = new Date();
  const tresMesesAtras = new Date();
  tresMesesAtras.setMonth(hoy.getMonth() - 3);

  for (let i = 0; i < 50; i++) {
    const vendedorAleatorio = vendedoresIds[Math.floor(Math.random() * vendedoresIds.length)];
    const montoAleatorio = Math.floor(Math.random() * 2000) + 100; // Entre 100 y 2100
    const fechaAleatoria = new Date(
      tresMesesAtras.getTime() + Math.random() * (hoy.getTime() - tresMesesAtras.getTime())
    );
    const descripcionAleatoria = descripciones[Math.floor(Math.random() * descripciones.length)];

    ventas.push({
      vendedor: vendedorAleatorio,
      monto: montoAleatorio,
      fecha: fechaAleatoria,
      descripcion: descripcionAleatoria
    });
  }

  return ventas;
};

// Función principal para poblar la base de datos
const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando seed de la base de datos...\n');

    // Limpiar colecciones existentes
    await Vendedor.deleteMany({});
    await Venta.deleteMany({});
    await ReglaComision.deleteMany({});
    console.log('🗑️  Colecciones limpiadas\n');

    // Insertar reglas de comisión
    const reglasCreadas = await ReglaComision.insertMany(reglasComision);
    console.log(`✅ ${reglasCreadas.length} Reglas de comisión creadas`);
    reglasCreadas.forEach(regla => {
      console.log(`   - ${regla.nombre}: $${regla.montoMinimo} - $${regla.montoMaximo} (${regla.porcentaje}%)`);
    });
    console.log('');

    // Insertar vendedores
    const vendedoresCreados = await Vendedor.insertMany(vendedores);
    console.log(`✅ ${vendedoresCreados.length} Vendedores creados`);
    vendedoresCreados.forEach(vendedor => {
      console.log(`   - ${vendedor.nombre} ${vendedor.apellido} (${vendedor.email})`);
    });
    console.log('');

    // Obtener IDs de vendedores
    const vendedoresIds = vendedoresCreados.map(v => v._id);

    // Generar e insertar ventas
    const ventasData = generarVentas(vendedoresIds);
    const ventasCreadas = await Venta.insertMany(ventasData);
    console.log(`✅ ${ventasCreadas.length} Ventas creadas`);
    
    // Calcular totales por vendedor
    const totalesPorVendedor = {};
    for (const venta of ventasCreadas) {
      const vendedorId = venta.vendedor.toString();
      if (!totalesPorVendedor[vendedorId]) {
        totalesPorVendedor[vendedorId] = 0;
      }
      totalesPorVendedor[vendedorId] += venta.monto;
    }

    console.log('\n📊 Resumen de ventas por vendedor:');
    for (const vendedor of vendedoresCreados) {
      const total = totalesPorVendedor[vendedor._id.toString()] || 0;
      console.log(`   - ${vendedor.nombre} ${vendedor.apellido}: $${total.toFixed(2)}`);
    }

    console.log('\n✅ ¡Seed completado exitosamente!\n');
    
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
  }
};

// Ejecutar seed
connectDB().then(() => {
  seedDatabase();
});