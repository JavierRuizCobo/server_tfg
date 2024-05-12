import express from 'express';
import { conectarDB } from './database';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
// Conectar a la base de datos
conectarDB();

// Rutas
app.use('/auth', authRouter);
app.use('/user', userRouter)

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
