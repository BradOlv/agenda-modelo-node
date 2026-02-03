
import { body } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const crearContactoValidator = [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("telefono").notEmpty().withMessage("El teléfono es obligatorio"),
    body("telefono").isLength({ min: 8 }).withMessage("El teléfono debe tener al menos 8 dígitos"),
    body("fecha").notEmpty().withMessage("La fecha es obligatoria"),
    checkValidators
];