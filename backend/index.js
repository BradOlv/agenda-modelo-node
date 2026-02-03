'use strict';

// importaciones
import dotenv from 'dotenv'; 
//Configuración de variables de entorno
dotenv.config();

import { initServer } from './configs/app.js';
import { dbConnection } from './configs/db.js';

// errores no capturados (esto te salva si el servidor truena por algo raro)
process.on ('uncaughtException', (error) => {
    console.log(error);
    process.exit(1);
});

// Promesas rechazadas o no manejadas
process.on('unhandledRejection', (reason, promise) => {
    console.log (reason, promise);
    process.exit(1);
});

// Inicialización del servidor con el mismo mensaje de ayer
console.log('Iniciando servidor de Agenda Web...');
dbConnection();
initServer();