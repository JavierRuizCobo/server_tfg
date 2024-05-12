import { Schema, model, Document, Model } from 'mongoose';

interface UsuarioInterface extends Document {
  nombre: string;
  apellido: string;
  correo: string;
  contraseña: string;
  rol: string;
  fecha_creacion: Date;
  activo: boolean;
}

const usuarioSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, required: true },
  fecha_creacion: { type: Date, default: Date.now },
});

export const Usuario: Model<UsuarioInterface> = model<UsuarioInterface>('Usuario', usuarioSchema);
