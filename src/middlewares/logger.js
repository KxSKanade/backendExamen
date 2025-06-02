// src/middlewares/logger.js
const morgan = require('morgan');

// Puedes personalizar el formato: 'combined', 'dev', etc.
module.exports = morgan('dev');
