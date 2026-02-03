import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de Cloudinary (Usa las variables de tu .env)
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const MIMETYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const fileExt = extname(file.originalname);
        const baseName = file.originalname.replace(fileExt, '').toLowerCase().replace(/\s+/g, '-');
        const publicId = `${baseName}-${uuidv4().substring(0, 8)}`;

        return {
            folder: 'agenda_web/contactos', // Se creará esta carpeta en tu Cloudinary
            public_id: publicId,
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
            transformation: [{ width: 500, height: 500, crop: 'limit' }],
        };
    },
});

export const uploadContactoImage = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (MIMETYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Solo se permiten imágenes: ${MIMETYPES.join(', ')}`), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB
});