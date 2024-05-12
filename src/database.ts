import mongoose from 'mongoose';

export async function conectarDB(): Promise<void> {
  try {
    await mongoose.connect('mongodb://localhost:27017/nombreDeTuBaseDeDatos');
    console.log('Conexión a MongoDB establecida');
  } catch (err) {
    console.error('Error al conectar a MongoDB: ', err);
  }
}
