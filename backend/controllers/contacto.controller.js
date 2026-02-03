'use strict';

import Contacto from "../models/contacto.model.js";

// POST: Crear contacto
export const crearContacto = async (req, res) => {
    try {
        const datosContacto = req.body;

        if (req.file) {
            datosContacto.foto = req.file.path;
        } else {
            // Usando tu lógica de imagen por defecto
            datosContacto.foto = 'agenda/default_avatar'; 
        }

        const contacto = new Contacto(datosContacto);
        await contacto.save();

        res.status(201).json({
            success: true,
            message: 'contacto creado exitosamente',
            data: contacto
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error al crear el contacto',
            error: error.message
        });
    }
};

// GET: Obtener todos los contactos activos
export const obtenerContactos = async (req, res) => {
    try {
        const contactos = await Contacto.find({ estado: true });
        res.status(200).json({
            success: true,
            total: contactos.length,
            contactos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los contactos',
            error: error.message
        });
    }
};

// GET: Obtener un contacto por ID
export const obtenerContactoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const contacto = await Contacto.findById(id);

        if (!contacto) {
            return res.status(404).json({
                success: false,
                message: 'Contacto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            contacto
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el contacto',
            error: error.message
        });
    }
};

// PUT: Actualizar contacto
export const actualizarContacto = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        if (req.file) {
            datos.foto = req.file.path;
        }

        const contacto = await Contacto.findByIdAndUpdate(id, datos, { new: true });

        if (!contacto) {
            return res.status(404).json({
                success: false,
                message: 'Contacto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contacto actualizado exitosamente',
            contacto
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el contacto',
            error: error.message
        });
    }
};

// DELETE: Eliminar contacto físico (o lógico si prefieres cambiar estado a false)
export const eliminarContacto = async (req, res) => {
    try {
        const { id } = req.params;
        const contacto = await Contacto.findByIdAndDelete(id);

        if (!contacto) {
            return res.status(404).json({
                success: false,
                message: 'Contacto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contacto eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el contacto',
            error: error.message
        });
    }
};