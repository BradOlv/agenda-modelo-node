'use strict';

import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | no se pudo conectar a MongoDB');
            mongoose.disconnect();
        });

        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | intentando conectar a MongoDB');
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB | conectado a MongoDB');
        });

        mongoose.connection.on('open', () => {
            console.log('MongoDB | conectado a la base de datos AgendaDB');
        });

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });
    } catch (error) {
        console.log(`Error al conectar la db: ${error}`);
        process.exit(1);
    }
};