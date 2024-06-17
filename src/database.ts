import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('Falta la configuración de la URI de MongoDB en el archivo .env');
}

export async function conectarDB(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('Conexión a MongoDB establecida');
  } catch (err) {
    console.error('Error al conectar a MongoDB: ', err);
  }
}
