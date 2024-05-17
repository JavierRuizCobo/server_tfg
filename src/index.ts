import express from 'express';
import { conectarDB } from './database';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import postRouter from './routes/posts.routes';
import exerciseRouter from './routes/exercise.routes';

import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

conectarDB();

// Rutas
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/posts', postRouter);
app.use('/exercises', exerciseRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
