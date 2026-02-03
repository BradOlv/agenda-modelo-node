
'use strict';

import { Router } from "express";
import { 
    crearTarea, 
    obtenerTareas, 
    actualizarTarea, 
    eliminarTarea 
} from "../controllers/tarea.controller.js";

const router = Router();

router.get('/', obtenerTareas);
router.post('/', crearTarea);
router.put('/:id', actualizarTarea);
router.delete('/:id', eliminarTarea);

export default router;