// src/index.js
require('dotenv').config();
const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// Middlewares globales
app.use(express.json());         // Para parsear JSON
app.use(logger);                 // Logging de requests

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
