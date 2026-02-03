'use strict';

import { Router } from "express";
import { 
    crearContacto, 
    obtenerContactos, 
    obtenerContactoPorId,
    actualizarContacto,
    eliminarContacto 
} from "../controllers/contacto.controller.js";
import { crearContactoValidator } from "../middlewares/contacto-validators.js";
import { uploadContactoImage } from "../middlewares/file-uploader.js"; 

const router = Router();

// Rutas GET
router.get('/', obtenerContactos);
router.get('/:id', obtenerContactoPorId);

// Ruta POST (con imagen y validaciones)
router.post('/', uploadContactoImage.single('foto'), crearContactoValidator, crearContacto);

// Ruta PUT (para actualizar con imagen opcional)
router.put('/:id', uploadContactoImage.single('foto'), actualizarContacto);

// Ruta DELETE
router.delete('/:id', eliminarContacto);

export default router;