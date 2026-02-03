'use strict';

import { Schema, model } from "mongoose";

const tareaSchema = Schema({
    titulo: {
        type: String,
        required: [true, "El título de la tarea es obligatorio"]
    },
    descripcion: {
        type: String
    },
    prioridad: {
        type: String,
        enum: ['Baja', 'Media', 'Alta'],
        default: 'Media'
    },
    completada: {
        type: Boolean,
        default: false
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Tarea', tareaSchema);