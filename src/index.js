require('dotenv').config();
const express = require('express');
const cors = require('cors');  // <--- Importar cors
const app = express();
const productRoutes = require('./routes/productRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// Middlewares globales
app.use(express.json());
app.use(cors({
  origin: 'https://practica02-o6gy.onrender.com'  // <--- Aquí pones el dominio de tu frontend
})); 
app.use(logger);

// Rutas
app.use('/api/products', productRoutes);

// Middleware de manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Endpoint no encontrado' });
});

// Middleware de manejo centralizado de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
