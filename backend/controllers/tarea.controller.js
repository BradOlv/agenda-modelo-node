'use strict';

import Tarea from "../models/tarea.model.js";

// POST: Crear tarea
export const crearTarea = async (req, res) => {
    try {
        const datos = req.body;
        const tarea = new Tarea(datos);
        await tarea.save();

        res.status(201).json({
            success: true,
            message: 'tarea creada exitosamente',
            data: tarea
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error al crear la tarea',
            error: error.message
        });
    }
};

// GET: Obtener todas las tareas activas
export const obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find({ estado: true });
        res.status(200).json({
            success: true,
            total: tareas.length,
            tareas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las tareas',
            error: error.message
        });
    }
};

// PUT: Actualizar tarea (para marcar como completada o editar texto)
export const actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const tarea = await Tarea.findByIdAndUpdate(id, datos, { new: true });

        if (!tarea) {
            return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
        }

        res.status(200).json({
            success: true,
            message: 'Tarea actualizada exitosamente',
            tarea
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la tarea',
            error: error.message
        });
    }
};

// DELETE: Eliminar tarea
export const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = await Tarea.findByIdAndDelete(id);

        if (!tarea) {
            return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
        }

        res.status(200).json({
            success: true,
            message: 'Tarea eliminada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la tarea',
            error: error.message
        });
    }
};