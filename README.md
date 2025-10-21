# 📚 README - Backend

---

# 🔙 MINICORE Backend - API de Comisiones

Sistema de gestión de comisiones de ventas desarrollado con **Node.js, Express y MongoDB**.

---

## 📋 Descripción

API RESTful que permite calcular comisiones de ventas basadas en reglas de negocio predefinidas. Implementa el patrón **MVC (Model-View-Controller)** para mantener el código organizado y escalable.

---

## 🚀 Tecnologías

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Variables de entorno

---

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de MongoDB
│   ├── models/
│   │   ├── Vendedor.js          # Modelo de Vendedor
│   │   ├── Venta.js             # Modelo de Venta
│   │   └── ReglaComision.js     # Modelo de Reglas de Comisión
│   ├── controllers/
│   │   ├── vendedorController.js # Lógica de vendedores
│   │   └── ventaController.js    # Lógica de ventas (CORE)
│   ├── services/
│   │   └── comisionService.js    # Cálculo de comisiones
│   ├── routes/
│   │   ├── vendedor.routes.js    # Rutas de vendedores
│   │   └── venta.routes.js       # Rutas de ventas
│   ├── seeds/
│   │   └── index.js              # Datos de prueba
│   ├── app.js                    # Configuración de Express
│   └── server.js                 # Punto de entrada
├── .env                          # Variables de entorno
├── .gitignore
└── package.json
```

---

## ⚙️ Instalación

### 1. Clonar el repositorio o crear el proyecto

```bash
git clone <tu-repositorio>
cd backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del backend:

```env
PORT=3001
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/minicore?retryWrites=true&w=majority
NODE_ENV=development
```

### 4. Poblar la base de datos (Seed)

```bash
npm run seed
```

Este comando crea:
- 4 vendedores de ejemplo
- 50 ventas aleatorias de los últimos 3 meses
- 4 reglas de comisión

### 5. Iniciar el servidor

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en: **http://localhost:3001**

---

## 📡 Endpoints de la API

### **Health Check**
```
GET /api/health
```
Verifica que la API esté funcionando.

**Respuesta:**
```json
{
  "success": true,
  "message": "API funcionando correctamente"
}
```

---

### **Vendedores**

#### Obtener todos los vendedores
```
GET /api/vendedores
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "nombre": "Juan",
      "apellido": "Pérez",
      "email": "juan.perez@minicore.com",
      "activo": true
    }
  ]
}
```

#### Crear vendedor
```
POST /api/vendedores
Content-Type: application/json

{
  "nombre": "María",
  "apellido": "González",
  "email": "maria@example.com"
}
```

---

### **Ventas** ⭐ (CORE)

#### Calcular comisiones por período
```
GET /api/ventas/comisiones?fechaInicio=2025-01-01&fechaFin=2025-10-21&vendedorId=todos
```

**Parámetros:**
- `fechaInicio` (requerido): Fecha inicial en formato YYYY-MM-DD
- `fechaFin` (requerido): Fecha final en formato YYYY-MM-DD
- `vendedorId` (opcional): ID del vendedor o "todos" para todos los vendedores

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "totalVentas": 45230.50,
    "totalComisiones": 4523.05,
    "cantidadVentas": 50,
    "detalles": [...],
    "ventas": [...]
  }
}
```

#### Crear venta
```
POST /api/ventas
Content-Type: application/json

{
  "vendedor": "507f1f77bcf86cd799439011",
  "monto": 750,
  "fecha": "2025-10-21",
  "descripcion": "Venta de productos"
}
```

---

## 💼 Reglas de Comisión

| Rango de Ventas | Porcentaje | Nivel |
|----------------|------------|---------|
| $0 - $600 | 6.0% | Comisión Básica |
| $601 - $800 | 8.0% | Comisión Media |
| $801 - $1,000 | 10.0% | Comisión Alta |
| $1,001+ | 15.0% | Comisión Premium |

---

## 🏗️ Arquitectura MVC

### **Models (Modelos)**
Definen la estructura de datos en MongoDB:
- `Vendedor`: Información del vendedor
- `Venta`: Registro de ventas
- `ReglaComision`: Reglas de negocio para comisiones

### **Controllers (Controladores)**
Manejan la lógica de negocio y las respuestas:
- `vendedorController`: Operaciones CRUD de vendedores
- `ventaController`: Cálculo de comisiones y gestión de ventas

### **Services (Servicios)**
Contienen la lógica de negocio compleja:
- `comisionService`: Algoritmos de cálculo de comisiones

### **Routes (Rutas)**
Definen los endpoints de la API:
- `vendedor.routes`: Rutas de vendedores
- `venta.routes`: Rutas de ventas

---

## 🧪 Pruebas con PowerShell

```powershell
# Health Check
Invoke-RestMethod -Uri "http://localhost:3001/api/health" -Method Get

# Obtener vendedores
Invoke-RestMethod -Uri "http://localhost:3001/api/vendedores" -Method Get

# Calcular comisiones
$fechaInicio = "2025-01-01"
$fechaFin = "2025-10-21"
Invoke-RestMethod -Uri "http://localhost:3001/api/ventas/comisiones?fechaInicio=$fechaInicio&fechaFin=$fechaFin&vendedorId=todos" -Method Get
```

---

## 📦 Scripts Disponibles

```json
{
  "start": "node src/server.js",      // Producción
  "dev": "nodemon src/server.js",     // Desarrollo
  "seed": "node src/seeds/index.js"   // Poblar BD
}
```

---

## 🔒 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3001` |
| `MONGODB_URI` | URI de MongoDB | `mongodb://localhost:27017/minicore` |
| `NODE_ENV` | Entorno de ejecución | `development` o `production` |

---

## 🐛 Solución de Problemas

### Error: No se puede conectar a MongoDB
- Verifica que MongoDB esté corriendo (local) o que la URI de Atlas sea correcta
- Comprueba las credenciales en `.env`

### Error: Puerto en uso
- Cambia el puerto en `.env` o cierra la aplicación que usa el puerto 3001

### Error al ejecutar seed
- Asegúrate de que la conexión a MongoDB esté activa
- Verifica que `.env` esté configurado correctamente

---

## 👨‍💻 Autor

**Hans Ortiz**  
📧 Email: Hans Ortiz  
🎓 Universidad: UDLA  
📅 Fecha: Octubre 2025

---

## 📄 Licencia

ISC

---


---

**¿Listo para usar?** 🚀 Sigue las instrucciones de instalación y ¡comienza a calcular comisiones!
