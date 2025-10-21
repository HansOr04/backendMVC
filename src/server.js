require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
connectDB();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});