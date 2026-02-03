import { Schema, model } from "mongoose";

const contactoSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del contacto es obligatorio"]
    },
    telefono: {
        type: String,
        required: [true, "El teléfono es obligatorio"]
    },
    fecha: {
        type: String,
        required: [true, "La fecha es obligatoria"]
    },
    foto: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Contacto', contactoSchema);