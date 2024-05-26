import express from 'express';
import { conectarDB } from './database';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import postRouter from './routes/posts.routes';
import exerciseRouter from './routes/exercise.routes';
import routinesRouter from './routes/routines.routes';
import plannedRoutinesRouter from './routes/plannedRoutines.routes';
import cookieParser from 'cookie-parser';


import cors from 'cors';
import mailRoutes from './routes/mail.routes';

const app = express();
app.use(express.json());

app.use(cookieParser());
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
app.use('/mail', mailRoutes);
app.use('/routines', routinesRouter)
app.use('/planned-routines', plannedRoutinesRouter)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
