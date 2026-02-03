'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import contactoRoutes from '../routes/contacto.routes.js';
import tareaRoutes from '../routes/tarea.routes.js'; 

const BASE_URL = '/agendaweb/v1';

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false, limit: '10mb'}));
    app.use(express.json({ limit: '10mb'}));
    app.use(cors()); // Aquí puedes importar tus corsOptions si creas el archivo
    app.use(helmet());
    app.use(morgan('dev'));
}

const routes = (app) => {
    // Aplicamos la misma lógica de rutas
    app.use(`${BASE_URL}/contactos`, contactoRoutes);
    app.use(`${BASE_URL}/tareas`, tareaRoutes);
}

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3001;

    try {
        middlewares(app);
        routes(app);

        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({
                status: "ok",
                service: "Agenda Web API",
                version: "1.0.0"
            });
        });

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });
    } catch (error) {
        console.log(`Error al iniciar el servidor: ${error}`);
    }
}